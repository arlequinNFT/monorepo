import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  decreaseBrushThickness,
  increaseBrushThickness,
  setCurrentBrushThickness,
} from './brush-thickness.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';

const BrushThickness = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentBrushThickness = useAppSelector(
    (state) => state.brushThickness.currentBrushThickness
  );
  const maxBrushThickness = useAppSelector(
    (state) => state.brushThickness.maxBrushThickness
  );
  const minBrushThickness = useAppSelector(
    (state) => state.brushThickness.minBrushThickness
  );

  const updateBrushThicknessUsingInput = (value: number) => {
    dispatch(setCurrentBrushThickness(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateSize', currentBrushThickness);
  }, [unityContext, currentBrushThickness]);

  useEffect(() => {
    if (keyPress?.ctrl) {
      if (scrollingDirection?.up) {
        dispatch(increaseBrushThickness());
      }
      if (scrollingDirection?.down) {
        dispatch(decreaseBrushThickness());
      }
    }
  }, [scrollingDirection, keyPress, unityContext, dispatch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-black-200 font-bold text-[0.875rem]">Thickness</p>

        <ComponentsInput
          className="w-1/3"
          type="text"
          id="px"
          min={minBrushThickness}
          max={maxBrushThickness}
          value={currentBrushThickness}
          rightElement={'px'}
          changed={(value) => updateBrushThicknessUsingInput(Number(value))}
        />
      </div>
      <div data-tip="CTRL + Mousewheel" data-place="bottom">
        <ComponentsInput
          className="w-5/5 mt-2"
          type="range"
          id="size"
          min={minBrushThickness}
          max={maxBrushThickness}
          value={currentBrushThickness}
          changed={(value) => updateBrushThicknessUsingInput(Number(value))}
        />
      </div>
    </>
  );
};

export default BrushThickness;
