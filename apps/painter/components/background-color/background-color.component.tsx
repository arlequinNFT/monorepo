import { HexColorInput, HexColorPicker } from 'react-colorful';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useDebouncedCallback } from 'use-debounce';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
    setCurrentBackgroundColor, setIsBackgroundEnable
} from '../../store/reducers/painter.reducer';

const BackgroundColor = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const isBackgroundEnable = useAppSelector((state) => state.painter.isBackgroundEnable);

  const dispatch = useAppDispatch();
  const currentBackgroundColor = useAppSelector(
    (state) => state.painter.currentBackgroundColor
  );

  const setBackgroundColorUsingColorPicker = useDebouncedCallback(
    (color: string) => {
      unityContext?.send('HudManager', 'SetBackgroundColor', color);
      dispatch(setCurrentBackgroundColor(color));
    },
    50
  );

  const enableBackground = () => {
      unityContext?.send('HudManager', 'EnableBackground');
      dispatch(setIsBackgroundEnable(true));
  }
  const disableBackground = () => {
    unityContext?.send('HudManager', 'DisableBackground');
    dispatch(setIsBackgroundEnable(false));
  };

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">Background</p>
      <div className="grid grid-flow-col gap-x-2 items-center py-1 mb-2">
        <Popover>
          <PopoverTrigger>
            <div
              className="w-8 h-8 border-primary-1200 hover:outline-primary-400 outline-primary-900  transition-all  border-2  cursor-pointer rounded-md"
              style={{ backgroundColor: currentBackgroundColor }}
            ></div>
          </PopoverTrigger>
          <PopoverContent className="bg-black-500 rounded-lg">
            <PopoverBody>
              <HexColorPicker
                className="w-full border-0"
                color={currentBackgroundColor}
                onChange={setBackgroundColorUsingColorPicker}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <div className="relative flex items-center gap-x-2">
          <span className="absolute px-2 text-white">#</span>
          <HexColorInput
            placeholder={'FFAEC9'}
            className="w-full bg-black-500 text-white hover:bg-[#424242] placeholder-primary-800  px-7 py-1 rounded-lg transition-all"
            color={currentBackgroundColor}
            onChange={setBackgroundColorUsingColorPicker}
          />
        </div>
        <div className="bg-black-500 text-white p-2 hover:bg-[#424242] rounded-lg transition-all cursor-pointer">
          {isBackgroundEnable && (
            <HiOutlineEye onClick={disableBackground}></HiOutlineEye>
          )}
          {!isBackgroundEnable && (
            <HiOutlineEyeOff onClick={enableBackground}></HiOutlineEyeOff>
          )}
        </div>
      </div>
    </>
  );
};

export default BackgroundColor;
