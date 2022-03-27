import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useDebouncedCallback } from 'use-debounce';

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setColor } from './ground-color.reducer';

const GroundColor = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.groundColor.color);

  const updateColor = useDebouncedCallback((color: string) => {
    unityContext?.send('HudManager', 'SetGroundColor', color);
    dispatch(setColor(color));
  }, 50);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mt-3 mb-1">
        Ground Color
      </p>

      <div className="grid grid-flow-col gap-x-2 items-center py-1 ">
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
    </>
  );
};

export default GroundColor;
