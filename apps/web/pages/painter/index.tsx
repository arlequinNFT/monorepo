import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Unity, { UnityContext } from 'react-unity-webgl';
import * as fcl from '@onflow/fcl';
import ArleesMode from '../../components/arlees-mode/arlees-mode.component';
import BackgroundColor from '../../components/background-color/background-color.component';
import BrushColor from '../../components/brush-color/brush-color.component';
import BrushSize from '../../components/brush-thickness/brush-thickness.component';
import PaintingMode from '../../components/painting-mode/painting-mode.component';
import PosesList from '../../components/poses-list/poses-list.component';
import SpeciesList from '../../components/species-list/species-list.component';
import Swatches from '../../components/swatches/swatches.component';
import UndoRedo from '../../components/undo-redo/undo-redo.component';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  hideLoadingScreen,
  setUnityLoaded,
  setUnityContext,
} from '../../store/reducers/painter.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';
import styles from './index.module.scss';

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import SettingsTabs from '../../components/settings-tabs/settings-tabs.component';
import Stickers from '../../components/stickers/stickers.component';
import BrushOpacity from '../../components/brush-opacity/brush-opacity.component';
import GroundColor from '../../components/ground-color/ground-color.component';
import GroundLightIntensity from '../../components/ground-light-intensity/ground-light-intensity.component';
import ArleeLight1 from '../../components/arlee-light-1/arlee-light-1.component';
import ArleeLight2 from '../../components/arlee-light-2/arlee-light-2.component';
import ArleeLight3 from '../../components/arlee-light-3/arlee-light-3.component';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import GroundLightColor from '../../components/ground-light-color/ground-light-color.component';
import ArleeLightsRotation from '../../components/arlee-lights-rotation/arlee-lights-rotation.component';
import { addColorToSwatches } from '../../components/swatches/swatches.reducer';
import { setCurrentUser } from '../../store/reducers/auth.reducer';
import {
  setArlequinStickersGroup,
  setPartnersStickersGroup,
  Sticker,
} from '../../components/stickers/stickers.reducer';
import { GET_ALL_PARTNERS_MINTABLE } from '../../cadence/scripts/get_all_partners_mintable';
import { GET_USER_PARTNERS_NFTS } from '../../cadence/scripts/get_user_partners_nfts';
import {
  setAllPartners,
  enablePartner,
  setAllPartnersLoaded,
  setUserPartnersLoaded,
} from '../../components/partners/partners.reducer';
import Mint from '../../components/mint/mint.component';

const Painter: NextPage = ({
  emotionsStickers,
  heartsStickers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { keyPress } = useScrollDirection();

  //#region Selectors
  const dispatch = useAppDispatch();
  const showLoadingScreen = useAppSelector(
    (state) => state.painter.showLoadingScreen
  );
  const currentArleesMode = useAppSelector(
    (state) => state.arleesMode.currentArleesMode
  );
  const unityLoaded = useAppSelector((state) => state.painter.unityLoaded);
  const activeSettingsTab = useAppSelector(
    (state) => state.settingsTabs.activeSettingsTab
  );
  //#endregion

  //#region Initialization
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const currentBrushColor = useAppSelector(
    (state) => state.brushColor.currentBrushColor
  );
  const currentBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.currentBrushOpacity
  );
  const currentBrushThickness = useAppSelector(
    (state) => state.brushThickness.currentBrushThickness
  );
  const currentBackgroundColor = useAppSelector(
    (state) => state.backgroundColor.currentBackgroundColor
  );
  const currentArlee = useAppSelector(
    (state) => state.speciesList.currentArlee
  );

  useEffect(() => {
    const unityContext = new UnityContext({
      loaderUrl: 'builds/Build/painter.loader.js',
      dataUrl: 'builds/Build/painter.data',
      frameworkUrl: 'builds/Build/painter.framework.js',
      codeUrl: 'builds/Build/painter.wasm',
    });
    if (unityContext) {
      dispatch(setUnityContext(unityContext));
    }
  }, [dispatch]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendIsUnityReady', async () => {
        unityContext.send('Redirection', 'StartPlayground');
      });
    }
  }, [unityContext]);

  useEffect(() => {
    if (unityContext && currentArlee && !unityLoaded) {
      unityContext?.on('SendIsPlaygroundReady', async () => {
        unityContext?.send('HudManager', 'LoadMetaPet', currentArlee);
        unityContext?.send('HudManager', 'SetBrushColor', currentBrushColor);
        const stringifiedList = JSON.stringify({
          sharedStickers: [...emotionsStickers, ...heartsStickers],
        });
        unityContext?.send('HudManager', 'LoadStickers', stringifiedList);
        dispatch(
          setArlequinStickersGroup({
            name: 'Emotion',
            stickers: emotionsStickers,
          })
        );
        dispatch(
          setArlequinStickersGroup({
            name: 'Hearts',
            stickers: heartsStickers,
          })
        );

        dispatch(hideLoadingScreen());
        dispatch(setUnityLoaded());
      });
    }
  }, [
    unityContext,
    currentArlee,
    currentUser,
    unityLoaded,
    emotionsStickers,
    heartsStickers,
    currentBackgroundColor,
    currentBrushColor,
    currentBrushOpacity,
    dispatch,
  ]);
  //#endregion

  //#region Partners
  // const allPartnersLoaded = useAppSelector(
  //   (state) => state.partners.allPartnersLoaded
  // );
  // const userPartnersLoaded = useAppSelector(
  //   (state) => state.partners.userPartnersLoaded
  // );
  // useEffect(() => {
  //   if (!allPartnersLoaded) {
  //     const fetchAllPartners = async () => {
  //       const allPartners = await fcl.query({
  //         cadence: GET_ALL_PARTNERS_MINTABLE, // {CryptoPiggos: true, Zeedz: true}
  //       });
  //       dispatch(setAllPartners({ allPartners }));
  //     };
  //     fetchAllPartners();

  //     dispatch(setAllPartnersLoaded());
  //   }
  // }, [dispatch, currentUser, allPartnersLoaded]);
  // useEffect(() => {
  //   if (!userPartnersLoaded && currentUser?.addr) {
  //     const fetchUserPartners = async () => {
  //       const userPartnersNFTs = await fcl.query({
  //         cadence: GET_USER_PARTNERS_NFTS, // [{name: 'CryptoPiggos'}, {name: 'Zeedz'}]
  //         args: (arg, t) => [arg(currentUser?.addr, t.Address)],
  //       });
  //       userPartnersNFTs?.map(async (partner) => {
  //         dispatch(enablePartner({ partnerName: partner.name }));

  //         switch (partner.name) {
  //           case 'CryptoPiggos':
  //             {
  //               const piggosStickersRes = await fetch(
  //                 'https://bafkreiashukkbjdtzggebjeq7h5fzh52hd3mozeqr7ts474jkliuxmmkvm.ipfs.nftstorage.link/'
  //               );
  //               const piggosStickers: { list: Sticker[] } =
  //                 await piggosStickersRes.json();

  //               dispatch(
  //                 setPartnersStickersGroup({
  //                   name: 'CryptoPiggos',
  //                   stickers: piggosStickers.list,
  //                 })
  //               );
  //             }
  //             break;

  //           default:
  //             break;
  //         }
  //       });
  //     };
  //     fetchUserPartners();

  //     dispatch(setUserPartnersLoaded());
  //   }
  // }, [dispatch, currentUser, userPartnersLoaded]);
  // //#endregion

  useEffect(() => {
    if (keyPress?.ctrl || keyPress?.alt || keyPress?.shift) {
      unityContext?.send('HudManager', 'DisableZoom');
    } else {
      unityContext?.send('HudManager', 'EnableZoom');
    }
  }, [unityContext, keyPress]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendBrushColor', async (color) => {
        dispatch(
          addColorToSwatches({
            color,
            currentBrushThickness,
            currentBrushOpacity,
          })
        );
      });
    }
  }, [unityContext, currentBrushOpacity, currentBrushThickness, dispatch]);

  return (
    <>
      {showLoadingScreen && (
        <div className="absolute bg-black-700 h-screen w-screen z-[999]">
          <div className="grid place-content-center h-full w-full">
            <div className="flex items-baseline">
              <p className="font-extrabold text-4xl text-white animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={styles['layout']}>
        <div className="bg-black">
          <div className="h-full w-full relative">
            {unityContext && (
              <>
                <Unity
                  unityContext={unityContext}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </>
            )}

            <div className="absolute right-0 top-0">
              <SettingsTabs></SettingsTabs>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-black-700">
          <div className="p-4 pb-0 flex h-full flex-col">
            {activeSettingsTab === 'arlees' && (
              <>
                <p className="uppercase text-white mb-2">Arlees</p>
                <ArleesMode></ArleesMode>

                <div className="w-full relative overflow-hidden flex-1">
                  {currentArleesMode === 'species' && (
                    <SpeciesList></SpeciesList>
                  )}
                  {currentArleesMode === 'poses' && <PosesList></PosesList>}
                </div>
              </>
            )}

            {activeSettingsTab === 'painting' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="uppercase text-white">Painting</p>
                  <UndoRedo></UndoRedo>
                </div>
                <PaintingMode></PaintingMode>
                <div className="py-6">
                  <BrushSize></BrushSize>
                </div>
                <BrushOpacity></BrushOpacity>

                <div className="py-6">
                  <BrushColor></BrushColor>
                </div>
                <Swatches></Swatches>
              </>
            )}

            {activeSettingsTab === 'stickers' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="uppercase text-white">Stickers</p>
                  <UndoRedo></UndoRedo>
                </div>
                <p className="text-black-200 font-bold text-[0.875rem]">
                  Scale: CTRL + Mouse Wheel
                </p>
                <p className="text-black-200 font-bold text-[0.875rem] mb-2">
                  Rotate: SHIFT + Mouse Wheel
                </p>
                <Stickers></Stickers>
              </>
            )}

            {activeSettingsTab === 'environment' && (
              <>
                <p className="uppercase text-white mb-2">Environment</p>
                <BackgroundColor></BackgroundColor>
                <GroundColor></GroundColor>
                <GroundLightColor></GroundLightColor>
                <GroundLightIntensity></GroundLightIntensity>
              </>
            )}

            {activeSettingsTab === 'light' && (
              <>
                <Accordion className="w-full" allowMultiple defaultIndex={[0]}>
                  <AccordionItem className="border-none">
                    <AccordionButton className="flex justify-between mt-3 mb-1 !p-0 !shadow-none">
                      <p className="text-white font-bold text-[0.875rem]">
                        Light 1
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight1></ArleeLight1>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem className="border-none">
                    <AccordionButton className="flex justify-between mt-3 mb-1 !p-0 !shadow-none">
                      <p className="text-white font-bold text-[0.875rem]">
                        Light 2
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight2></ArleeLight2>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem className="border-none">
                    <AccordionButton className="flex justify-between mt-3 mb-1 !p-0 !shadow-none">
                      <p className="text-white font-bold text-[0.875rem]">
                        Light 3
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight3></ArleeLight3>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem className="border-none">
                    <AccordionButton className="flex justify-between mt-3 mb-1 !p-0 !shadow-none">
                      <p className="text-white font-bold text-[0.875rem]">
                        Lights Rotation
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLightsRotation></ArleeLightsRotation>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </>
            )}
          </div>
          <Mint></Mint>
        </div>
      </div>
      <ReactTooltip type="light" effect="solid" />
    </>
  );
};

export default Painter;

export const getStaticProps: GetStaticProps = async (context) => {
  const emotionsStickersRes = await fetch(
    'https://bafkreigc2n6mba76xwe2c5fbp35dfaclgmflpb45tpbst6evs5meatz7lm.ipfs.nftstorage.link/'
  );
  const emotionsStickers: { list: Sticker[] } =
    await emotionsStickersRes.json();

  const heartsStickersRes = await fetch(
    'https://bafkreibldqba5wmaw24vhvmxfqyi4nswrex2gbdtks6ntd4zlc2sqsmafq.ipfs.nftstorage.link/'
  );
  const heartsStickers: { list: Sticker[] } = await heartsStickersRes.json();

  return {
    props: {
      emotionsStickers: emotionsStickers.list,
      heartsStickers: heartsStickers.list,
    },
  };
};
