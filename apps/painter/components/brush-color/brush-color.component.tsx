import { useEffect } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { FaEyeDropper } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentBrushColor } from './brush-color.reducer';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';

const BrushColor = () => {
  const dispatch = useAppDispatch();

  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentBrushColor = useAppSelector(
    (state) => state.brushColor.currentBrushColor
  );

  const currentPaintingMode = useAppSelector(
    (state) => state.paintingMode.currentPaintingMode
  );
  const setBrushColorUsingColorPicker = useDebouncedCallback(
    (color: string) => {
      unityContext?.send('HudManager', 'SetBrushColor', color);
      dispatch(setCurrentBrushColor(color));
    },
    50
  );

  const setPaintingModeToPicker = () => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Picker');
    dispatch(setCurrentPaintingMode('picker'));
  };

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendPickedColor', async (color: string) => {
        dispatch(setCurrentBrushColor(color));
        dispatch(setCurrentPaintingMode('brush'));
      });
    }
  }, [unityContext, currentBrushColor, dispatch]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mb-2">Color</p>
      <div className="grid grid-flow-col gap-x-2 items-center">
        <Popover>
          <PopoverTrigger>
            <div
              className="w-8 h-8 transition-all border-2 cursor-pointer rounded-md"
              style={{ backgroundColor: currentBrushColor }}
            ></div>
          </PopoverTrigger>
          <div className="z-50">
            <PopoverContent>
              <PopoverBody>
                <HexColorPicker
                  className="w-full border-0 "
                  color={currentBrushColor}
                  onChange={setBrushColorUsingColorPicker}
                />
              </PopoverBody>
            </PopoverContent>
          </div>
        </Popover>
        <div className="relative flex items-center gap-x-2">
          <span className="absolute px-2 text-white">#</span>
          <HexColorInput
            placeholder={'FFAEC9'}
            className="w-full bg-black-500 text-white hover:bg-black-400 placeholder-primary-800  px-7 py-1 rounded-lg transition-all"
            color={currentBrushColor}
            onChange={setBrushColorUsingColorPicker}
          />
        </div>
        <div
          onClick={(e) => setPaintingModeToPicker()}
          className={`${
            currentPaintingMode === 'picker'
              ? 'bg-black-500 hover:bg-black-400 text-white'
              : 'bg-black-600 hover:bg-black-500  text-black-200'
          } p-2 rounded-lg transition-all cursor-pointer`}
        >
          <FaEyeDropper></FaEyeDropper>
        </div>
      </div>
    </>
  );
};

export default BrushColor;
