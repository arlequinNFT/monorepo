/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useHotkeys } from 'react-hotkeys-hook';
import Unity, { UnityContext } from 'react-unity-webgl';
import { useDebouncedCallback } from 'use-debounce';

import ComponentsButton from '@arlequin/components/button';
import ComponentsInput from '@arlequin/components/input';
import {
    Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger
} from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../store/hook';
import {
    addColorToSwatches, BrushType, hideLoadingScreen, setArlees, setCurrentArlee,
    setCurrentBrushType, setCurrentcolor, setCurrentMode
} from '../store/reducers/painter.reducer';
import styles from './style.module.scss';

import type { NextPage } from 'next';
const Index: NextPage = () => {
  //#region Selectors
  const dispatch = useAppDispatch();

  const currentMode = useAppSelector((state) => state.painter.currentMode);
  const currentBrushType = useAppSelector(
    (state) => state.painter.currentBrushType
  );
  const currentColor = useAppSelector((state) => state.painter.currentColor);
  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  const arlees = useAppSelector((state) => state.painter.arlees);
  const showLoadingScreen = useAppSelector(
    (state) => state.painter.showLoadingScreen
  );
  const swatches = useAppSelector((state) => state.painter.swatches);
  //#endregion

  //#region State
  const [unityContext, setUnityContext] = useState<UnityContext>();
  const [shareButtonIsLoading, setshareButtonIsLoading] =
    useState<boolean>(false);
  //#endregion

  //#region Unity
  const updateColorViaColorPicker = useDebouncedCallback((color: string) => {
    unityContext?.send('HudManager', 'UpdateColor', color);
    dispatch(setCurrentcolor(color));
  }, 50);
  const updateColorViaSwatches = (color: string) => {
    unityContext?.send('HudManager', 'UpdateColor', color);
    dispatch(setCurrentcolor(color));
    toggleBrushMode();
  };
  const updateSize = useDebouncedCallback((value: number) => {
    unityContext?.send('HudManager', 'UpdateSize', value);
  }, 100);

  const updateHardness = useDebouncedCallback((value: number) => {
    console.log(value);
    unityContext?.send('HudManager', 'UpdateHardness', value);
  }, 100);
  const updateAngle = useDebouncedCallback((value: number) => {
    unityContext?.send('HudManager', 'UpdateAngle', value);
  }, 100);
  const loadArlee = (species: string) =>
    unityContext?.send('HudManager', 'LoadMetaPet', species);
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
    dispatch(setCurrentMode('brush'));
  };
  const toggleBucketMode = () => {
    dispatch(setCurrentMode('bucket'));
    unityContext?.send('HudManager', 'ToggleBucketMode');
  };
  const togglePickerMode = () => {
    dispatch(setCurrentMode('picker'));
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
    if (arlees.length === 0) {
      const list: any[] = [
        {
          image: '/images/cacatoes.png',
          species: 'cacatoes',
        },
        {
          image: '/images/pig.png',
          species: 'pig',
        },
        {
          image: '/images/turtle.png',
          species: 'turtle',
        },
        {
          image: '/images/deer.png',
          species: 'deer',
        },
        {
          image: '/images/elephant.png',
          species: 'elephant',
        },
      ];
      dispatch(setArlees(list));
      dispatch(setCurrentArlee(list[0]));
    }
  }, [dispatch, arlees.length]);

  useEffect(() => {
    const unityContext = new UnityContext({
      loaderUrl: 'builds/painter/painter.loader.js',
      dataUrl: 'builds/painter/painter.data.unityweb',
      frameworkUrl: 'builds/painter/painter.framework.js.unityweb',
      codeUrl: 'builds/painter/painter.wasm.unityweb',
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
        dispatch(setCurrentcolor(color));
        dispatch(setCurrentMode('brush'));
        unityContext?.send('HudManager', 'SetBrushType', 'Round');
      });
    }
  }, [unityContext, dispatch]);

  useEffect(() => {
    if (unityContext && currentArlee.species) {
      unityContext?.on('SendIsPlaygroundReady', async () => {
        console.log(currentArlee.species);

        unityContext?.send('HudManager', 'LoadMetaPet', currentArlee.species);
        unityContext?.send('HudManager', 'UpdateColor', currentColor);
        unityContext?.send('HudManager', 'UpdateSize', 23);
        dispatch(hideLoadingScreen());
      });
    }
  }, [unityContext, currentArlee, currentColor, dispatch]);

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
  useHotkeys('ctrl+z', () => undo(), [unityContext]);
  useHotkeys('ctrl+y', () => redo(), [unityContext]);
  useHotkeys(
    'ctrl+b',
    () => {
      dispatch(setCurrentMode('brush'));
    },
    [unityContext]
  );
  useHotkeys('ctrl+g', () => toggleBucketMode(), [unityContext]);
  useHotkeys('ctrl+i', () => togglePickerMode(), [unityContext]);
  //#endregion

  return (
    <>
      {showLoadingScreen && (
        <div className="absolute bg-primary-1000 h-screen w-screen z-10">
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
        <div className="flex items-center flex-col  bg-[#171717]">
          <div className="w-full p-4 text-center">
            <Link href="/">
              <a className="text-rainbow font-extrabold text-3xl">Arlequin</a>
            </Link>
          </div>
          <div className="w-full relative overflow-hidden flex-1">
            <div
              id={styles['arlees-collection']}
              className="grid space-y-4 absolute -inset-0 overflow-y-scroll p-4"
            >
              {arlees.map((arlee, key) => {
                return (
                  <div
                    key={key}
                    className={`flex justify-center items-center rounded-2xl cursor-pointer bg-slate-200 ${
                      currentArlee?.species === arlee.species
                        ? 'outline outline-8 outline-[#525252]'
                        : ''
                    }`}
                    onClick={(e) => {
                      dispatch(setCurrentArlee(arlee));
                      loadArlee(arlee.species);
                    }}
                  >
                    <img
                      className="h-52 object-contain rounded-2xl"
                      src={arlee.image}
                      alt={arlee.species}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-x-2 w-full bg-[#242424] pt-4">
            <a
              href="https://discord.gg/rBPP7uxnwd"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="bg-[#525252] rounded-full cursor-pointer"
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
                className="bg-[#525252] rounded-full cursor-pointer"
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
              <Unity
                unityContext={unityContext}
                style={{ width: '100%', height: '100%', borderRadius: '2rem' }}
              />
            )}

            <ul className="absolute flex gap-x-2 p-1">
              {swatches.map((color) => (
                <li
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-8 rounded-md cursor-pointer"
                  onClick={(e) => updateColorViaSwatches(color)}
                ></li>
              ))}
              <li
                className="grid place-content-center h-8 w-8 rounded-md cursor-pointer bg-white text-black text-3xl "
                onClick={(e) => dispatch(addColorToSwatches(currentColor))}
              >
                +
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center flex-col  bg-[#171717] overflow-y-auto">
          <section className="flex-1 w-full p-4">
            <div className="flex items-center justify-between">
              <h2 className="uppercase text-white text-sm font-extrabold tracking-wider  mr-4">
                Painting
              </h2>
              <div className="flex gap-x-2">
                <Image
                  onClick={(e) => undo()}
                  className={`bg-[#303030] hover:bg-[#3f3f3f] transition-colors rounded-full cursor-pointer`}
                  src="/icons/undo.svg"
                  alt="Undo icon"
                  width="28px"
                  height="28px"
                />
                <Image
                  onClick={(e) => redo()}
                  className={`bg-[#303030] hover:bg-[#3f3f3f] transition-colors rounded-full cursor-pointer`}
                  src="/icons/redo.svg"
                  alt="Redo icon"
                  width="28px"
                  height="28px"
                />
              </div>
            </div>

            <div className="p-1">
              <p className="text-[#6B6B6B]">Mode</p>
              <ul className="grid grid-cols-3 p-1 bg-[#242424] rounded-xl">
                <li
                  className={`${
                    currentMode === 'brush' ? 'bg-[#303030] shadow-md' : "'"
                  } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
                  onClick={(e) => toggleBrushMode()}
                >
                  <img
                    src={`/icons/brush_${
                      currentMode === 'brush' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Brush icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentMode === 'brush' ? 'text-white' : 'text-[#6B6B6B]'
                    }`}
                  >
                    Brush
                  </p>
                </li>

                <li
                  className={`${
                    currentMode === 'bucket' ? 'bg-[#303030] shadow-md' : "'"
                  } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
                  onClick={(e) => toggleBucketMode()}
                >
                  <img
                    src={`/icons/bucket_${
                      currentMode === 'bucket' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Bucket icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentMode === 'bucket' ? 'text-white' : 'text-[#6B6B6B]'
                    }`}
                  >
                    Bucket
                  </p>
                </li>

                <li
                  className={`${
                    currentMode === 'picker' ? 'bg-[#303030] shadow-md' : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg  cursor-pointer `}
                  onClick={(e) => togglePickerMode()}
                >
                  <img
                    className="text-red-500"
                    src={`/icons/picker_${
                      currentMode === 'picker' ? 'active' : 'inactive'
                    }.svg`}
                    alt="Color Dropper icon"
                    width="36px"
                    height="36px"
                  />
                  <p
                    className={`${
                      currentMode === 'picker' ? 'text-white' : 'text-[#6B6B6B]'
                    }`}
                  >
                    Dropper
                  </p>
                </li>
              </ul>
            </div>
            <div className="p-1">
              <p className="text-[#6B6B6B]">Brush Style</p>
              <ul className="grid grid-cols-2 p-1 bg-[#242424] rounded-xl">
                <li
                  className={`${
                    currentMode === 'brush' &&
                    currentBrushType === BrushType.Round
                      ? 'bg-[#303030] shadow-md'
                      : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg cursor-pointer`}
                  onClick={(e) => {
                    dispatch(setCurrentMode('brush'));
                    setBrushType(BrushType.Round);
                  }}
                >
                  <Image
                    src={`/icons/pen_round_${
                      currentMode === 'brush' &&
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
                      currentMode === 'brush' &&
                      currentBrushType === BrushType.Round
                        ? 'text-white'
                        : 'text-[#6B6B6B]'
                    }`}
                  >
                    Round
                  </p>
                </li>

                <li
                  className={`${
                    currentMode === 'brush' &&
                    currentBrushType === BrushType.Square
                      ? 'bg-[#303030] shadow-md'
                      : "'"
                  } col-span-1 flex flex-col  items-center py-1 rounded-lg cursor-pointer`}
                  onClick={(e) => {
                    dispatch(setCurrentMode('brush'));
                    setBrushType(BrushType.Square);
                  }}
                >
                  <Image
                    src={`/icons/pen_square_${
                      currentMode === 'brush' &&
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
                      currentMode === 'brush' &&
                      currentBrushType === BrushType.Square
                        ? 'text-white'
                        : 'text-[#6B6B6B]'
                    }`}
                  >
                    Square
                  </p>
                </li>
              </ul>
            </div>
            <div className="p-1">
              <p className="text-[#6B6B6B]">Size</p>
              <div className="flex items-center justify-evenly p-1">
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="size"
                  min={2}
                  max={100}
                  defaultValue={25}
                  changed={(value) => updateSize(Number(value))}
                />
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            {/* <div className="p-1">
              <p className="text-[#6B6B6B]">Opacity</p>
              <div className="flex items-center justify-evenly p-1">
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <Input
                  className="w-4/5 mx-1"
                  type="range"
                  id="size"
                  min={2}
                  max={100}
                  defaultValue={25}
                  changed={(value) => updateSize(Number(value))}
                />
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div> */}
            <div className="p-1">
              <p className="text-[#6B6B6B]">Hardness</p>
              <div className="flex items-center justify-evenly p-1">
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/small.svg`}
                  alt="Small icon"
                  width="36px"
                  height="36px"
                />
                <ComponentsInput
                  className="w-4/5 mx-1"
                  type="range"
                  id="hardness"
                  min={2}
                  max={100}
                  defaultValue={25}
                  changed={(value) => updateHardness(Number(value))}
                />
                <Image
                  className="bg-[#303030] rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            <div className="p-1">
              <p className="text-[#6B6B6B]">Angle</p>
              <div className="flex items-center justify-evenly p-1">
                <Image
                  className="bg-[#303030] rounded-full"
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
                  className="bg-[#303030] rounded-full"
                  src={`/icons/big.svg`}
                  alt="Big icon"
                  width="36px"
                  height="36px"
                />
              </div>
            </div>
            <div className="p-1">
              <p className="text-[#6B6B6B]">Color</p>
              <div className="grid grid-flow-col gap-x-2 items-center py-1">
                <Popover placement="top" arrowPadding={0}>
                  <PopoverTrigger>
                    <div
                      className="w-8 h-8 border-primary-1200 hover:outline-primary-400 outline-primary-900  transition-all  border-2  cursor-pointer rounded-md"
                      style={{ backgroundColor: currentColor }}
                    ></div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />

                    <PopoverBody>
                      <HexColorPicker
                        color={currentColor}
                        onChange={updateColorViaColorPicker}
                      />
                      <ul className={styles['colors-list']}>
                        {swatches.map((color) => (
                          <li
                            key={color}
                            style={{ backgroundColor: color }}
                            className="h-6 w-6 rounded-md cursor-pointer"
                            onClick={(e) => updateColorViaSwatches(color)}
                          ></li>
                        ))}
                        <li
                          className="grid place-content-center h-6 w-6 rounded-md cursor-pointer bg-white text-black text-3xl "
                          onClick={(e) =>
                            dispatch(addColorToSwatches(currentColor))
                          }
                        >
                          +
                        </li>
                      </ul>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <div className="relative flex items-center gap-x-2">
                  <span className="absolute px-2 text-primary-700 ">#</span>
                  <HexColorInput
                    placeholder={'FFAEC9'}
                    className="w-full bg-[#303030] text-white hover:bg-[#424242] placeholder-primary-800  px-7 py-1 rounded-lg transition-all"
                    color={currentColor}
                    onChange={updateColorViaColorPicker}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="flex place-content-center w-full py-3  bg-[#242424]">
            {/* <Button color="secondary" rounded onClick={onOpenShare}>
              Share
            </Button> */}
            <ComponentsButton
              color="secondary"
              rounded
              onClick={generateAvatar}
            >
              Generate Avatar
            </ComponentsButton>
          </section>
        </div>
      </div>
    </>
  );
};

export default Index;
