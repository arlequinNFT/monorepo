import { HexColorInput, HexColorPicker } from 'react-colorful';
import { FaEyeDropper } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentBrushColor, setCurrentPaintingMode } from '../../store/reducers/painter.reducer';

const BrushColor = () => {
  const dispatch = useAppDispatch();

  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentBrushColor = useAppSelector(
    (state) => state.painter.currentBrushColor
  );
  const setBrushColorUsingColorPicker = useDebouncedCallback(
    (color: string) => {
      unityContext?.send('HudManager', 'SetBrushColor', color);
      dispatch(setCurrentBrushColor(color));
    },
    50
  );

  // useEffect(() => {
  //   if (unityContext) {
  //     unityContext?.on('SendPickedColor', async (color: string) => {
  //       dispatch(setCurrentBrushColor(color));
  //       dispatch(setCurrentPaintingMode('brush'));
  //       unityContext?.send('HudManager', 'SetBrushType', 'Round');
  //     });
  //   }
  // }, [unityContext, currentBrushColor, dispatch]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">Brush</p>
      <div className="grid grid-flow-col gap-x-2 items-center py-1 mb-2">
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
                onChange={setBrushColorUsingColorPicker}
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
            onChange={setBrushColorUsingColorPicker}
          />
        </div>
        {/* <div className="bg-black-500 text-white p-2 hover:bg-[#424242] rounded-lg transition-all cursor-pointer">
          <FaEyeDropper></FaEyeDropper>
        </div> */}
      </div>
    </>
  );
};

export default BrushColor;
