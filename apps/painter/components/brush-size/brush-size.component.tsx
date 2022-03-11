import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  decreaseBrushSize,
  increaseBrushSize,
  setCurrentBrushSize,
} from '../../store/reducers/painter.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';

const BrushSize = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentBrushSize = useAppSelector(
    (state) => state.painter.currentBrushSize
  );
  const maxBrushSize = useAppSelector((state) => state.painter.maxBrushSize);
  const minBrushSize = useAppSelector((state) => state.painter.minBrushSize);

  const updateBrushSizeUsingInput = (value: number) => {
    dispatch(setCurrentBrushSize(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateSize', currentBrushSize);
  }, [unityContext, currentBrushSize]);

  useEffect(() => {
    if (keyPress?.ctrl) {
      if (scrollingDirection?.up) {
        dispatch(increaseBrushSize());
      }
      if (scrollingDirection?.down) {
        dispatch(decreaseBrushSize());
      }
    }
  }, [scrollingDirection, keyPress, unityContext, dispatch]);

  return (
    <>
      <div className="flex justify-between">
        <p className="text-black-200 font-bold text-[0.875rem]">Thickness</p>

        <ComponentsInput
          className="w-1/3"
          type="text"
          id="other"
          min={minBrushSize}
          max={maxBrushSize}
          value={currentBrushSize}
          rightElement={'px'}
          changed={(value) => updateBrushSizeUsingInput(Number(value))}
        />
      </div>
      <div data-tip="CTRL + Mousewheel" data-place="bottom">
        <ComponentsInput
          className="w-5/5 mt-4"
          type="range"
          id="size"
          min={minBrushSize}
          max={maxBrushSize}
          value={currentBrushSize}
          changed={(value) => updateBrushSizeUsingInput(Number(value))}
        />
      </div>
    </>
  );
};

export default BrushSize;
