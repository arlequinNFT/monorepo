import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useDebouncedCallback } from 'use-debounce';

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setIntensity, setColor } from './arlee-light-2.reducer';
import { ComponentsInput } from '@arlequin/components/input';
import { useEffect } from 'react';

const ArleeLight2 = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const intensity = useAppSelector((state) => state.arleeLight2.intensity);
  const min = useAppSelector((state) => state.arleeLight2.min);
  const max = useAppSelector((state) => state.arleeLight2.max);
  const color = useAppSelector((state) => state.arleeLight2.color);

  const updateIntensity = (value: number) => {
    dispatch(setIntensity(value));
  };
  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLight2Intensity', intensity);
  }, [unityContext, intensity]);
  const updateColor = useDebouncedCallback((value: string) => {
    unityContext?.send('HudManager', 'SetLight2Color', value);
    dispatch(setColor(value));
  }, 50);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mb-2">Color</p>
      <div className="grid grid-flow-col gap-x-2 items-center">
        <Popover>
          <PopoverTrigger>
            <div
              className="w-8 h-8 border-primary-1200 hover:outline-primary-400 outline-primary-900  transition-all  border-2  cursor-pointer rounded-md"
              style={{ backgroundColor: color }}
            ></div>
          </PopoverTrigger>
          <div className="z-50">
            <PopoverContent>
              <PopoverBody>
                <HexColorPicker
                  className="w-full border-0"
                  color={color}
                  onChange={updateColor}
                />
              </PopoverBody>
            </PopoverContent>
          </div>
        </Popover>
        <div className="relative flex items-center gap-x-2">
          <span className="absolute px-2 text-white">#</span>
          <HexColorInput
            placeholder={'FFAEC9'}
            className="w-full bg-black-500 text-white hover:bg-[#424242] placeholder-primary-800  px-7 py-1 rounded-lg transition-all"
            color={color}
            onChange={updateColor}
          />
        </div>
      </div>
      <p className="text-black-200 font-bold text-[0.875rem] my-2">Intensity</p>

      <ComponentsInput
        className="mb-2"
        type="range"
        id="size"
        min={min}
        max={max}
        value={intensity}
        changed={(value) => updateIntensity(Number(value))}
      />
    </>
  );
};

export default ArleeLight2;
