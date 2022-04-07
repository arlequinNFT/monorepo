import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Unity, { UnityContext } from 'react-unity-webgl';
import * as fcl from '@onflow/fcl';
import { ComponentsButton } from '@arlequin/components/button';
import ArleesMode from '../components/arlees-mode/arlees-mode.component';
import BackgroundColor from '../components/background-color/background-color.component';
import BrushColor from '../components/brush-color/brush-color.component';
import BrushSize from '../components/brush-thickness/brush-thickness.component';
import PaintingMode from '../components/painting-mode/painting-mode.component';
import PosesList from '../components/poses-list/poses-list.component';
import ArleesList from '../components/species-list/species-list.component';
import Swatches from '../components/swatches/swatches.component';
import UndoRedo from '../components/undo-redo/undo-redo.component';
import { useAppDispatch, useAppSelector } from '../store/hook';
import {
  hideLoadingScreen,
  setSceneLoaded,
  setUnityContext,
} from '../store/reducers/ui.reducer';
import { useScrollDirection } from '../utils/use-scroll-direction';
import styles from './index.module.scss';

import type { NextPage } from 'next';
import SettingsTabs from '../components/settings-tabs/settings-tabs.component';
import Stickers from '../components/stickers/stickers.component';
import BrushOpacity from '../components/brush-opacity/brush-opacity.component';
import GroundColor from '../components/ground-color/ground-color.component';
import GroundLightIntensity from '../components/ground-light-intensity/ground-light-intensity.component';
import ArleeLight1 from '../components/arlee-light-1/arlee-light-1.component';
import ArleeLight2 from '../components/arlee-light-2/arlee-light-2.component';
import ArleeLight3 from '../components/arlee-light-3/arlee-light-3.component';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion';
import GroundLightColor from '../components/ground-light-color/ground-light-color.component';
import ArleeLightsRotation from '../components/arlee-lights-rotation/arlee-lights-rotation.component';
import { addColorToSwatches } from '../components/swatches/swatches.reducer';
import Partners from '../components/partners/partners.component';
import { MINT_ARLEE_SCENE_NFT } from '../cadence/transactions/ArleeScene/mintArleeSceneNFT';
import { nftstorageClient } from '../configs/nftstorage';
import { setCurrentUser } from '../store/reducers/auth.reducer';
const Index: NextPage = () => {
  const { keyPress } = useScrollDirection();

  //#region Selectors
  const dispatch = useAppDispatch();
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
  const showLoadingScreen = useAppSelector(
    (state) => state.painter.showLoadingScreen
  );
  const currentArleesMode = useAppSelector(
    (state) => state.arleesMode.currentArleesMode
  );
  const sceneLoaded = useAppSelector((state) => state.painter.sceneLoaded);
  const activeSettingsTab = useAppSelector(
    (state) => state.settingsTabs.activeSettingsTab
  );

  //#endregion

  const mint = async () => {
    if (currentUser?.loggedIn) {
      unityContext.send('HudManager', 'RequestArtwork');
    } else {
      fcl.logIn();
    }

    const files = [
      // new File([thumbnail], 'thumbnail.png'),
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
    ];
  };

  //#region Use Effects
  useEffect(
    () =>
      fcl.currentUser.subscribe((user) => {
        dispatch(setCurrentUser(user));
      }),
    [dispatch]
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
    const checkIfArleeSceneNFTIsOpen = async () => {
      const res = await fcl.query({
        cadence: `
              import Arlequin from 0xArlequin

pub fun main() : Bool {
    return Arlequin.getArleeSceneMintable()
}
              `,
      });

      console.log(res);
    };
    checkIfArleeSceneNFTIsOpen();
  }, []);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on(
        'SendArtwork',
        async (metadata: string, thumbnail: string) => {
          const files = [
            new File([new Blob([metadata])], 'metadata.txt', {
              type: 'text/plain',
            }),
            new File([new Blob([thumbnail])], 'thumbnail.txt', {
              type: 'text/plain',
            }),
          ];

          const cid = await nftstorageClient.storeDirectory(files);

          if (cid) {
            const res = await fcl.mutate({
              cadence: MINT_ARLEE_SCENE_NFT,
              limit: 999,
              args: (arg, t) => [
                arg(cid, t.String),
                arg('description', t.String),
              ],
            });
            await fcl.tx(res).onceSealed();
          }
        }
      );
    }
  }, [unityContext]);

  useEffect(() => {
    if (unityContext && currentArlee && !sceneLoaded) {
      unityContext?.on('SendIsPlaygroundReady', async () => {
        // initialization
        unityContext?.send('HudManager', 'LoadMetaPet', currentArlee);
        unityContext?.send('HudManager', 'SetBrushColor', currentBrushColor);
        dispatch(hideLoadingScreen());
        dispatch(setSceneLoaded());
      });
    }
  }, [
    unityContext,
    currentArlee,
    sceneLoaded,
    currentBackgroundColor,
    currentBrushColor,
    currentBrushOpacity,
    dispatch,
  ]);

  useEffect(() => {
    if (keyPress?.ctrl || keyPress?.alt || keyPress?.shift) {
      unityContext?.send('HudManager', 'DisableZoom');
    } else {
      unityContext?.send('HudManager', 'EnableZoom');
    }
  }, [unityContext, keyPress]);

  useEffect(() => {
    if (unityContext) {
      unityContext.on('SendAvatar', async (avatar) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:image/png;base64,${avatar}`;
        downloadLink.download = 'arlequinNFT_avatar';
        downloadLink.click();
      });
    }
  }, [unityContext]);

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
  //#endregion

  return (
    <>
      {showLoadingScreen && (
        <div className="absolute bg-purple h-screen w-screen z-[999]">
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
                  {currentArleesMode === 'species' && <ArleesList></ArleesList>}
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
                  <AccordionItem>
                    <AccordionButton className="flex justify-between">
                      <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                        Light 1
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight1></ArleeLight1>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton className="flex justify-between">
                      <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                        Light 2
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight2></ArleeLight2>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton className="flex justify-between">
                      <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                        Light 3
                      </p>
                      <AccordionIcon className="!text-white text-xl" />
                    </AccordionButton>
                    <AccordionPanel>
                      <ArleeLight3></ArleeLight3>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton className="flex justify-between">
                      <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
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

            {activeSettingsTab === 'partners' && (
              <>
                <p className="uppercase text-white mb-2">Partners</p>
                <Partners></Partners>
              </>
            )}
          </div>

          <div className="flex justify-center  w-full py-3 bg-black-600">
            <ComponentsButton color="secondary" rounded onClick={mint}>
              MINT (10 $FLOW)
            </ComponentsButton>
          </div>
        </div>
      </div>
      <ReactTooltip type="light" effect="solid" />
    </>
  );
};

export default Index;
