import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactTooltip from 'react-tooltip';
import Unity, { UnityContext } from 'react-unity-webgl';
import { useDebouncedCallback } from 'use-debounce';

import { ComponentsButton } from '@arlequin/components/button';
import { ComponentsInput } from '@arlequin/components/input';
import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel
} from '@chakra-ui/accordion';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';

import ArleesMode from '../components/arlees-mode/arlees-mode.component';
import BackgroundColor from '../components/background-color/background-color.component';
import BackgroundMode from '../components/background-mode/background-mode.component';
import BrushColor from '../components/brush-color/brush-color.component';
import BrushHardness from '../components/brush-hardness/brush-hardness.component';
import BrushOpacity from '../components/brush-opacity/brush-opacity.component';
import BrushSize from '../components/brush-size/brush-size.component';
import LightColor from '../components/light-color/light-color.component';
import LightIntensity from '../components/light-intensity/light-intensity.component';
import LightXAxis from '../components/light-x-axis/light-x-axis.component';
import LightYAxis from '../components/light-y-axis/light-y-axis.component';
import PaintingMode from '../components/painting-mode/painting-mode.component';
import PosesList from '../components/poses-list/poses-list.component';
import ArleesList from '../components/species-list/species-list.component';
import Swatches from '../components/swatches/swatches.component';
import UndoRedo from '../components/undo-redo/undo-redo.component';
import { useAppDispatch, useAppSelector } from '../store/hook';
import {
    hideLoadingScreen, setSceneLoaded, setUnityContext
} from '../store/reducers/painter.reducer';
import { useScrollDirection } from '../utils/use-scroll-direction';
import styles from './index.module.scss';

import type { NextPage } from 'next';
const Index: NextPage = () => {
  const { keyPress } = useScrollDirection();

  //#region Selectors
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentBrushColor = useAppSelector(
    (state) => state.painter.currentBrushColor
  );
  const currentBrushHardness = useAppSelector(
    (state) => state.painter.currentBrushHardness
  );
  const currentBrushOpacity = useAppSelector(
    (state) => state.painter.currentBrushOpacity
  );
  const currentBackgroundColor = useAppSelector(
    (state) => state.painter.currentBackgroundColor
  );
  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  const showLoadingScreen = useAppSelector(
    (state) => state.painter.showLoadingScreen
  );
  const currentArleesMode = useAppSelector(
    (state) => state.painter.currentArleesMode
  );
  const sceneLoaded = useAppSelector((state) => state.painter.sceneLoaded);
  //#endregion

  const generateAvatar = () =>
    unityContext?.send('HudManager', 'RequestAvatar');

  //#region Use Effects
  useEffect(() => {
    const unityContext = new UnityContext({
      loaderUrl: 'builds/painter/painter.loader.js',
      dataUrl: 'builds/painter/painter.data',
      frameworkUrl: 'builds/painter/painter.framework.js',
      codeUrl: 'builds/painter/painter.wasm',
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
        unityContext?.send(
          'HudManager',
          'UpdateHardness',
          currentBrushHardness
        );
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
    currentBrushHardness,
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
        <div className="absolute bg-purple h-screen w-screen z-10">
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
        <div className="flex flex-col bg-black-700">
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
        </div>
        <div className="px-36 py-12 3xl:px-72 3xl:py-24 bg-black">
          <div className="h-full w-full relative">
            {unityContext && (
              <>
                <Unity
                  unityContext={unityContext}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '2rem',
                  }}
                />
              </>
            )}

            <Swatches></Swatches>
          </div>
        </div>

        <div className="flex flex-col bg-black-700 overflow-hidden  relative">
          <section className="top-6 p-4 overflow-y-auto w-full pb-16">
            <UndoRedo></UndoRedo>

            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem className="py-4 ">
                <AccordionButton className="flex justify-between">
                  <p className="uppercase text-white text-xs font-bold">
                    Brush
                  </p>
                  <AccordionIcon className="!text-white" />
                </AccordionButton>
                <AccordionPanel className="py-2">
                  <PaintingMode></PaintingMode>
                  <BrushColor></BrushColor>
                  <BrushSize></BrushSize>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem className="py-4 border-t border-black-400">
                <AccordionButton className="flex justify-between">
                  <p className="uppercase text-white text-xs font-bold">
                    Background
                  </p>
                  <AccordionIcon className="!text-white" />
                </AccordionButton>
                <AccordionPanel className="py-2">
                  <BackgroundMode></BackgroundMode>
                  <BackgroundColor></BackgroundColor>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem className="py-4 border-t border-black-400">
                <AccordionButton className="flex justify-between">
                  <p className="uppercase text-white text-xs font-bold">
                    Light
                  </p>
                  <AccordionIcon className="!text-white" />
                </AccordionButton>
                <AccordionPanel className="py-2">
                  <LightColor></LightColor>
                  <LightIntensity></LightIntensity>
                  <LightXAxis></LightXAxis>
                  <LightYAxis></LightYAxis>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="flex justify-center absolute bottom-0 w-full py-3 bg-black-600">
              <ComponentsButton
                color="secondary"
                rounded
                onClick={generateAvatar}
              >
                GENERATE AVATAR
              </ComponentsButton>
          </section>
        </div>
      </div>
      <ReactTooltip type="light" effect="solid" />
    </>
  );
};

export default Index;
