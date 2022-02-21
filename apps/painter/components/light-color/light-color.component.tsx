import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useDebouncedCallback } from 'use-debounce';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentLightColor } from '../../store/reducers/painter.reducer';

const LightColor = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentLightColor = useAppSelector(
    (state) => state.painter.currentLightColor
  );

  const setLightColorUsingColorPicker = useDebouncedCallback(
    (color: string) => {
      unityContext?.send('HudManager', 'SetLightColor', color);
      dispatch(setCurrentLightColor(color));
    },
    50
  );

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] my-2">Color</p>
      <div className="grid grid-flow-col gap-x-2 items-center">
        <Popover>
          <PopoverTrigger>
            <div
              className="w-8 h-8 border-primary-1200 hover:outline-primary-400 outline-primary-900  transition-all  border-2  cursor-pointer rounded-md"
              style={{ backgroundColor: currentLightColor }}
            ></div>
          </PopoverTrigger>
          <div className="z-50">
            <PopoverContent>
              <PopoverBody>
                <HexColorPicker
                  className="w-full border-0"
                  color={currentLightColor}
                  onChange={setLightColorUsingColorPicker}
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
            color={currentLightColor}
            onChange={setLightColorUsingColorPicker}
          />
        </div>
      </div>
    </>
  );
};

export default LightColor;
