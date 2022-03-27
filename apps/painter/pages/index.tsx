import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Unity, { UnityContext } from 'react-unity-webgl';

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
import ArleeLightsRotation from '../components/arlee-lights-rotation/arlee-lights-rotation.component';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { group } from 'console';
import GroundLightColor from '../components/ground-light-color/ground-light-color.component';
const Index: NextPage = () => {
  const { keyPress } = useScrollDirection();

  //#region Selectors
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentBrushColor = useAppSelector(
    (state) => state.brushColor.currentBrushColor
  );
  const currentBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.currentBrushOpacity
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

  const generateImage = () => unityContext?.send('HudManager', 'RequestAvatar');

  //#region Use Effects
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
    if (unityContext && currentArlee && !sceneLoaded) {
      unityContext?.on('SendIsPlaygroundReady', async () => {
        // initialization
        unityContext?.send('HudManager', 'LoadMetaPet', currentArlee);
        unityContext?.send('HudManager', 'SetBrushColor', currentBrushColor);
        unityContext?.send('HudManager', 'UpdateOpacity', currentBrushOpacity);
        unityContext?.send(
          'HudManager',
          'SetBackgroundColor',
          currentBackgroundColor
        );
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
        {/* <div className="flex flex-col bg-black-700">
          <div className="w-full p-4 text-center">
            <a
              href="http://arlequin.gg/"
              target="_blank"
              rel="noreferrer"
              className="text-rainbow font-extrabold text-3xl"
            >
              Arlequin
            </a>
          </div>

          <div className="flex flex-col flex-1 px-4">
            <p className="text-black-200">Arlees</p>

            <ArleesMode></ArleesMode>

            <div className="w-full relative overflow-hidden flex-1">
              {currentArleesMode === 'species' && <ArleesList></ArleesList>}
              {currentArleesMode === 'poses' && <PosesList></PosesList>}
            </div>
          </div>

          <div className="flex items-center justify-center pt-2 gap-x-2 w-full bg-black-600">
            <a
              href="https://discord.gg/rBPP7uxnwd"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="bg-black-300 rounded-full cursor-pointer"
                src="/icons/discord.svg"
                alt="Discord icon"
                width="36px"
                height="36px"
              />
            </a>
            <a
              href="https://twitter.com/ArlequinNFT"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="bg-black-300 rounded-full cursor-pointer"
                src="/icons/twitter.svg"
                alt="Twitter icon"
                width="36px"
                height="36px"
              />
            </a>
          </div>
        </div> */}
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

            <div className="absolute bottom-0 left-2">
              <Swatches></Swatches>
            </div>

            <div className="absolute right-0 top-0">
              <SettingsTabs></SettingsTabs>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-black-700">
          <div className="p-4 pb-0 flex h-full flex-col">
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
                <div className="pb-6">
                  <BrushOpacity></BrushOpacity>
                </div>
                <BrushColor></BrushColor>
              </>
            )}

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
          </div>

          <div className="flex justify-center  w-full py-3 bg-black-600">
            <ComponentsButton color="secondary" rounded onClick={generateImage}>
              GENERATE IMAGE
            </ComponentsButton>
          </div>
        </div>
      </div>
      <ReactTooltip type="light" effect="solid" />
    </>
  );
};

export default Index;
