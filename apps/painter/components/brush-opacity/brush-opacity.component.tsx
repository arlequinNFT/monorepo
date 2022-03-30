import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  decreaseBrushOpacity,
  increaseBrushOpacity,
  setCurrentBrushOpacity,
} from './brush-opacity.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';

const BrushOpacity = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const dispatch = useAppDispatch();
  const currentBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.currentBrushOpacity
  );
  const maxBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.maxBrushOpacity
  );
  const minBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.minBrushOpacity
  );

  const updateBrushOpacityUsingInput = (value: number) => {
    dispatch(setCurrentBrushOpacity(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateOpacity', currentBrushOpacity);
  }, [unityContext, currentBrushOpacity]);

  useEffect(() => {
    if (keyPress?.shift) {
      if (scrollingDirection?.up) {
        dispatch(increaseBrushOpacity());
      }
      if (scrollingDirection?.down) {
        dispatch(decreaseBrushOpacity());
      }
    }
  }, [scrollingDirection, keyPress, unityContext, dispatch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-black-200 font-bold text-[0.875rem]">Opacity</p>

        <ComponentsInput
          className="w-1/3"
          type="text"
          id="px"
          min={minBrushOpacity}
          max={maxBrushOpacity}
          value={currentBrushOpacity}
          rightElement={'px'}
          changed={(value) => updateBrushOpacityUsingInput(Number(value))}
        />
      </div>
      <div data-tip="CTRL + Mousewheel" data-place="bottom">
        <ComponentsInput
          className="mt-2"
          type="range"
          id="size"
          min={minBrushOpacity}
          max={maxBrushOpacity}
          value={currentBrushOpacity}
          changed={(value) => updateBrushOpacityUsingInput(Number(value))}
        />
      </div>
    </>
  );
};

export default BrushOpacity;
