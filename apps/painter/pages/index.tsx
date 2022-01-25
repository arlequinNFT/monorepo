import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import ReactTooltip from 'react-tooltip';
import Unity, { UnityContext } from 'react-unity-webgl';
import { useDebouncedCallback } from 'use-debounce';

import { ComponentsButton } from '@arlequin/components/button';
import { ComponentsInput } from '@arlequin/components/input';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';

import ArleesList from '../components/arlees-list/arlees-list.component';
import PosesList from '../components/poses-list/poses-list.component';
import { useAppDispatch, useAppSelector } from '../store/hook';
import {
    addColorToSwatches, BrushType, decreaseBrushHardness, decreaseBrushOpacity, decreaseBrushSize,
    hideLoadingScreen, increaseBrushHardness, increaseBrushOpacity, increaseBrushSize, PoseLabels,
    setCurrentArleesMode, setCurrentBrushColor, setCurrentBrushHardness, setCurrentBrushOpacity,
    setCurrentBrushSize, setCurrentBrushType, setCurrentPaintingMode, setSceneLoaded
} from '../store/reducers/painter.reducer';
import styles from './index.module.scss';

import type { NextPage } from 'next';
const Index: NextPage = () => {
  //#region Selectors
  const dispatch = useAppDispatch();

  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  const currentArleesMode = useAppSelector((state) => state.painter.currentArleesMode);
  const currentBrushType = useAppSelector(
    (state) => state.painter.currentBrushType
  );
  const currentBrushColor = useAppSelector(
    (state) => state.painter.currentBrushColor
  );
  const currentBrushOpacity = useAppSelector(
    (state) => state.painter.currentBrushOpacity
  );
  const currentBrushHardness = useAppSelector(
    (state) => state.painter.currentBrushHardness
  );
  const currentPaintingMode = useAppSelector(
    (state) => state.painter.currentPaintingMode
  );
  const currentBrushSize = useAppSelector(
    (state) => state.painter.currentBrushSize
  );
  const maxBrushHardness = useAppSelector(
    (state) => state.painter.maxBrushHardness
  );
  const maxBrushOpacity = useAppSelector(
    (state) => state.painter.maxBrushOpacity
  );
  const maxBrushSize = useAppSelector((state) => state.painter.maxBrushSize);
  const minBrushHardness = useAppSelector(
    (state) => state.painter.minBrushHardness
  );
  const minBrushOpacity = useAppSelector(
    (state) => state.painter.minBrushOpacity
  );
  const minBrushSize = useAppSelector((state) => state.painter.minBrushSize);
  const showLoadingScreen = useAppSelector(
    (state) => state.painter.showLoadingScreen
  );
  const swatches = useAppSelector((state) => state.painter.swatches);
  const sceneLoaded = useAppSelector((state) => state.painter.sceneLoaded);
  //#endregion

  //#region State
  const [unityContext, setUnityContext] = useState<UnityContext>();
  const [shareButtonIsLoading, setshareButtonIsLoading] =
    useState<boolean>(false);
  //#endregion

  //#region Unity
  const updateColorUsingColorPicker = useDebouncedCallback((color: string) => {
    unityContext?.send('HudManager', 'UpdateColor', color);
    dispatch(setCurrentBrushColor(color));
  }, 50);
  const updateColorUsingSwatches = (color: string) => {
    unityContext?.send('HudManager', 'UpdateColor', color);
    dispatch(setCurrentBrushColor(color));
    toggleBrushMode();
  };
  const updateAngle = useDebouncedCallback((value: number) => {
    unityContext?.send('HudManager', 'UpdateAngle', value);
  }, 100);
  const loadArlee = (species: string) => {
    unityContext?.send('HudManager', 'LoadMetaPet', species);
    // dispatch(setPoses(species));
  }
  const setPose = (pose: PoseLabels) =>
    unityContext?.send('HudManager', 'SetPose', pose);
  const redo = () => unityContext?.send('HudManager', 'Redo');
  const setBrushType = (brushType: BrushType) => {
    unityContext?.send('HudManager', 'SetBrushType', brushType);
    dispatch(setCurrentBrushType(brushType));
  };
  const generateAvatar = () => {
    setshareButtonIsLoading(true);
    unityContext?.send('HudManager', 'RequestAvatar');
  };
  const toggleBrushMode = () => {
    unityContext?.send('HudManager', 'SetBrushType', currentBrushType);
    dispatch(setCurrentPaintingMode('brush'));
  };
  const toggleBucketMode = () => {
    dispatch(setCurrentPaintingMode('bucket'));
    unityContext?.send('HudManager', 'ToggleBucketMode');
  };
  const togglePickerMode = () => {
    dispatch(setCurrentPaintingMode('picker'));
    unityContext?.send('HudManager', 'TogglePickerMode');
  };

  const undo = () => {
    if (unityContext) {
      unityContext.send('HudManager', 'Undo');
    }
  };
  //#endregion

  //#region Use Effects
  useEffect(() => {
    const unityContext = new UnityContext({
      loaderUrl: 'builds/painter/painter.loader.js',
      dataUrl: 'builds/painter/painter.data',
      frameworkUrl: 'builds/painter/painter.framework.js',
      codeUrl: 'builds/painter/painter.wasm',
    });
    if (unityContext) {
      setUnityContext(unityContext);
    }
  }, []);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendIsUnityReady', async () => {
        unityContext.send('Redirection', 'StartPlayground');
      });
    }
  }, [unityContext]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendPickedColor', async (color: string) => {
        dispatch(setCurrentBrushColor(color));
        dispatch(setCurrentPaintingMode('brush'));
        unityContext?.send('HudManager', 'SetBrushType', 'Round');
      });
    }
  }, [unityContext, dispatch]);

  useEffect(() => {
    if (unityContext && currentArlee.species && !sceneLoaded) {
      unityContext?.on('SendIsPlaygroundReady', async () => {
        unityContext?.send('HudManager', 'LoadMetaPet', currentArlee.species);
        unityContext?.send('HudManager', 'UpdateColor', currentBrushColor);
        unityContext?.send('HudManager', 'UpdateSize', currentBrushSize);
        unityContext?.send(
          'HudManager',
          'UpdateHardness',
          currentBrushHardness
        );
        unityContext?.send('HudManager', 'UpdateOpacity', currentBrushOpacity);
        dispatch(hideLoadingScreen());
        dispatch(setSceneLoaded());
      });
    }
  }, [unityContext, currentArlee, currentBrushColor, currentBrushSize, currentBrushHardness, currentBrushOpacity, sceneLoaded, dispatch]);

  useEffect(() => {
    if (unityContext) {
      unityContext.on('SendIsUnityReady', async () => {
        unityContext.send('Redirection', 'StartPlayground');
      });
    }
  }, [unityContext]);

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

  //#region HotKeys
  useHotkeys('ctrl+z, command+z', () => undo(), [unityContext]);
  useHotkeys('ctrl+y, command+y', () => redo(), [unityContext]);
  useHotkeys(
    'ctrl+b, command+b',
    () => {
      toggleBrushMode();
    },
    [unityContext]
  );
  useHotkeys(
    'ctrl+g, command+g',
    (event) => {
      event.preventDefault();
      toggleBucketMode();
    },
    [unityContext]
  );
  useHotkeys(
    'ctrl+i, command+i',
    () => {
      togglePickerMode();
    },
    [unityContext]
  );
  //#endregion

  //#region Brush Size, Opacity, Hardness, Angle
  useEffect(() => {
    if (unityContext) {
      unityContext?.send('HudManager', 'UpdateSize', currentBrushSize);
    }
  }, [unityContext, currentBrushSize]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.send('HudManager', 'UpdateOpacity', currentBrushOpacity);
    }
  }, [unityContext, currentBrushOpacity]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.send('HudManager', 'UpdateHardness', currentBrushHardness);
    }
  }, [unityContext, currentBrushHardness]);

  const updateBrushSizeUsingInput = (value: number) => dispatch(setCurrentBrushSize(value));
  const updateBrushOpacityUsingInput = (value: number) => dispatch(setCurrentBrushOpacity(value));
  const updateBrushHardnessUsingInput = (value: number) => dispatch(setCurrentBrushHardness(value));

  const handleScrollWheelUp = (e: WheelEvent) => {
    if (e?.ctrlKey) {
      dispatch(increaseBrushSize());
    }

    if (e?.shiftKey) {
      dispatch(increaseBrushOpacity());
    }

    if (e?.altKey) {
      dispatch(increaseBrushHardness());
    }

    const enableZoom = !e?.ctrlKey && !e?.shiftKey && !e?.altKey;

    if (enableZoom) {
      unityContext?.send('HudManager', 'EnableZoom');
    } else {
      unityContext?.send('HudManager', 'DisableZoom');
    }

  };

  const handleScrollWheelDown = (e: WheelEvent) => {
    if (e?.ctrlKey) {
      dispatch(decreaseBrushSize());
    }

    if (e?.shiftKey) {
      dispatch(decreaseBrushOpacity());

    }

    if (e?.altKey) {
      dispatch(decreaseBrushHardness());
    }

    const enableZoom = !e?.ctrlKey && !e?.shiftKey && !e?.altKey;
    if (enableZoom) {
      unityContext?.send('HudManager', 'EnableZoom');
    } else {
      unityContext?.send('HudManager', 'DisableZoom');
    }
  };

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
            <Link href="/">
              <a className="text-rainbow font-extrabold text-3xl">Arlequin</a>
            </Link>
          </div>
          <div className="flex flex-col flex-1 px-4">
            <p className="text-black-200">Arlees</p>
            <ul className="grid grid-cols-2 w-full mb-2 bg-black-600 rounded-xl">
              <li
                className={`${
                  currentArleesMode === 'species'
                    ? 'bg-black-500 shadow-md'
                    : "'"
                } col-span-1 flex flex-col items-center py-1 rounded-lg cursor-pointer`}
                onClick={(e) => dispatch(setCurrentArleesMode('species'))}
              >
                {/* <img
                  src={`/icons/brush_${
                    currentArleesMode === 'brush' ? 'active' : 'inactive'
                  }.svg`}
                  alt="Brush icon"
                  width="36px"
                  height="36px"
                /> */}
                <p
                  className={`${
                    currentArleesMode === 'species'
                      ? 'text-white'
                      : 'text-black-200'
                  }`}
                >
                  Species
                </p>
              </li>

              <li
                className={`${
                  currentArleesMode === 'poses' ? 'bg-black-500 shadow-md' : "'"
                } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
                onClick={(e) => dispatch(setCurrentArleesMode('poses'))}
              >
                {/* <img
                  src={`/icons/bucket_${
                    currentArleesMode === 'bucket' ? 'active' : 'inactive'
                  }.svg`}
                  alt="Bucket icon"
                  width="36px"
                  height="36px"
                /> */}
                <p
                  className={`${
                    currentArleesMode === 'poses'
                      ? 'text-white'
                      : 'text-black-200'
                  }`}
                >
                  Poses
                </p>
              </li>
            </ul>
            <div className="w-full relative overflow-hidden flex-1">
              {currentArleesMode === 'species' && (
                <ArleesList loadArlee={loadArlee}></ArleesList>
              )}
              {currentArleesMode === 'poses' && (
                <PosesList setPose={setPose}></PosesList>
              )}
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
        <div className="p-24 bg-black">
          <div className="h-full w-full relative">
            {unityContext && (
              <ReactScrollWheelHandler
                className="h-full"
                onClick={(e) => dispatch(addColorToSwatches(currentBrushColor))}
                upHandler={(e) => handleScrollWheelUp(e)}
                downHandler={(e) => handleScrollWheelDown(e)}
                timeout={100}
              >
                <Unity
                  unityContext={unityContext}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '2rem',
                  }}
                />
              </ReactScrollWheelHandler>
            )}

            <ul className="absolute flex gap-x-2 p-1">
              {swatches?.map((color) => (
                <li
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-8 rounded-md cursor-pointer"
                  onClick={(e) => updateColorUsingSwatches(color)}
                ></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center flex-col  bg-black-700 overflow-y-auto">
          <section className="flex-1 w-full p-4">
            <div className="flex items-center justify-between">
              <h2 className="uppercase text-white text-sm font-extrabold tracking-wider  mr-4">
                Painting
              </h2>
              <div className="flex gap-x-2">
                <Image
                  data-tip="Undo | CTRL + Z"
                  onClick={(e) => undo()}
                  className={`bg-black-500 hover:bg-black-400 transition-colors rounded-full cursor-pointer`}
                  src="/icons/undo.svg"
                  alt="Undo icon"
                  width="28px"
                  height="28px"
                />
                <Image
                  data-tip="Redo | CTRL + Y"
                  onClick={(e) => redo()}
                  className={`bg-black-500 hover:bg-black-400 transition-colors rounded-full cursor-pointer`}
                  src="/icons/redo.svg"
                  alt="Redo icon"
                  width="28px"
                  height="28px"
                />
              </div>
            </div>

            <div className="p-1">
              <p className="text-black-200">Mode</p>
              <ul className="grid grid-cols-3 p-1 bg-black-600 rounded-xl">
                <li
                  data-tip="CTRL + B"
                  className={`${
                    currentPaintingMode === 'brush'
                      ? 'bg-black-500 shadow-md'
                      : "'"
                  } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
                  onClick={(e) => toggleBrushMode()}
                >
                  <img
                    src={`/icons/brush_${
                      currentPaintingMode === 'brush' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Brush icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentPaintingMode === 'brush'
                        ? 'text-white'
                        : 'text-black-200'
                    }`}
                  >
                    Brush
                  </p>
                </li>

                <li
                  data-tip="CTRL + G"
                  className={`${
                    currentPaintingMode === 'bucket'
                      ? 'bg-black-500 shadow-md'
                      : "'"
                  } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
                  onClick={(e) => toggleBucketMode()}
                >
                  <img
                    src={`/icons/bucket_${
                      currentPaintingMode === 'bucket' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Bucket icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentPaintingMode === 'bucket'
                        ? 'text-white'
                        : 'text-black-200'
                    }`}
                  >
                    Bucket
                  </p>
                </li>

                <li
                  data-tip="CTRL + I"
                  className={`${
                    currentPaintingMode === 'picker'
                      ? 'bg-black-500 shadow-md'
                      : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg  cursor-pointer `}
                  onClick={(e) => togglePickerMode()}
                >
                  <img
                    className="text-red-500"
                    src={`/icons/picker_${
                      currentPaintingMode === 'picker' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Color Dropper icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentPaintingMode === 'picker'
                        ? 'text-white'
                        : 'text-black-200'
                    }`}
                  >
                    Dropper
                  </p>
                </li>
              </ul>
            </div>
            {/* <div className="p-1">
              <p className="text-black-200">Brush Style</p>
              <ul className="grid grid-cols-2 p-1 bg-black-600 rounded-xl">
                <li
                  className={`${
                    currentPaintingMode === 'brush' &&
                    currentBrushType === BrushType.Round
                      ? 'bg-black-500 shadow-md'
                      : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg cursor-pointer`}
                  onClick={(e) => {
                    dispatch(setCurrentPaintingMode('brush'));
                    setBrushType(BrushType.Round);
                  }}
                >
                  <Image
                    src={`/icons/pen_round_${
                      currentPaintingMode === 'brush' &&
                      currentBrushType === BrushType.Round
                        ? 'active'
                        : 'inactive'
                    }.svg`}
                    alt="Rounded Pen icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentPaintingMode === 'brush' &&
                      currentBrushType === BrushType.Round
                        ? 'text-white'
                        : 'text-black-200'
                    }`}
                  >
                    Round
                  </p>
                </li>

                <li
                  className={`${
                    currentPaintingMode === 'brush' &&
                    currentBrushType === BrushType.Square
                      ? 'bg-black-500 shadow-md'
                      : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg cursor-pointer`}
                  onClick={(e) => {
                    dispatch(setCurrentPaintingMode('brush'));
                    setBrushType(BrushType.Square);
                  }}
                >
                  <Image
                    src={`/icons/pen_square_${
                      currentPaintingMode === 'brush' &&
                      currentBrushType === BrushType.Square
                        ? 'active'
                        : 'inactive'
                    }.svg`}
                    alt="Square Pen icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentPaintingMode === 'brush' &&
                      currentBrushType === BrushType.Square
                        ? 'text-white'
                        : 'text-black-200'
                    }`}
                  >
                    Square
                  </p>
                </li>
              </ul>
            </div> */}
            <div className="p-1">
              <p className="text-black-200">Size</p>
              <div
                data-tip="Shortcut: CTRL + Mousewheel"
                className="flex items-center justify-evenly p-1"
              >
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="size"
                  min={minBrushSize}
                  max={maxBrushSize}
                  value={currentBrushSize}
                  changed={(value) => updateBrushSizeUsingInput(Number(value))}
                />
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            <div className="p-1">
              <p className="text-black-200">Opacity</p>
              <div
                data-tip="Shortcut: Shift + Mousewheel"
                className="flex items-center justify-evenly p-1"
              >
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="opacity"
                  min={minBrushOpacity}
                  max={maxBrushOpacity}
                  value={currentBrushOpacity}
                  changed={(value) =>
                    updateBrushOpacityUsingInput(Number(value))
                  }
                />
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            <div className="p-1">
              <p className="text-black-200">Hardness</p>
              <div
                data-tip="Shortcut: Alt + Mousewheel"
                className="flex items-center justify-evenly p-1"
              >
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="hardness"
                  min={minBrushHardness}
                  max={maxBrushHardness}
                  value={currentBrushHardness}
                  changed={(value) =>
                    updateBrushHardnessUsingInput(Number(value))
                  }
                />
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            {/* <div className="p-1">
              <p className="text-black-200">Angle</p>
              <div className="flex items-center justify-evenly p-1">
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="angle"
                  min={2}
                  max={100}
                  defaultValue={25}
                  changed={(value) => updateAngle(Number(value))}
                />
                <Image
                  className="bg-black-500 rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div> */}
            <div className="p-1">
              <p className="text-black-200">Color</p>
              <div className="grid grid-flow-col gap-x-2 items-center py-1">
                <Popover>
                  <PopoverTrigger>
                    <div
                      className="w-8 h-8 border-primary-1200 hover:outline-primary-400 outline-primary-900  transition-all  border-2  cursor-pointer rounded-md"
                      style={{ backgroundColor: currentBrushColor }}
                    ></div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-black-500 rounded-lg">
                    <PopoverBody>
                      <HexColorPicker
                        className="w-full border-0"
                        color={currentBrushColor}
                        onChange={updateColorUsingColorPicker}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <div className="relative flex items-center gap-x-2">
                  <span className="absolute px-2 text-white">#</span>
                  <HexColorInput
                    placeholder={'FFAEC9'}
                    className="w-full bg-black-500 text-white hover:bg-[#424242] placeholder-primary-800  px-7 py-1 rounded-lg transition-all"
                    color={currentBrushColor}
                    onChange={updateColorUsingColorPicker}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="flex place-content-center w-full py-3 bg-black-600">
            {/* <Button color="secondary" rounded onClick={onOpenShare}>
              Share
            </Button> */}
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
