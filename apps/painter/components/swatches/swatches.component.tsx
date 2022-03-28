import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentBrushColor } from '../brush-color/brush-color.reducer';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';
import { addColorToSwatches } from './swatches.reducer';

const Swatches = () => {
  const dispatch = useAppDispatch();
  //#region Selectors
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const swatches = useAppSelector((state) => state.swatches.swatches);
  const currentBrushThickness = useAppSelector(
    (state) => state.brushThickness.currentBrushThickness
  );
  const currentBrushOpacity = useAppSelector(
    (state) => state.brushOpacity.currentBrushOpacity
  );
  //#endregion

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendBrushColor', async (color) => {
        dispatch(
          addColorToSwatches({
            color,
            currentBrushThickness,
            currentBrushOpacity,
          })
        );
      });
    }
  }, [unityContext, currentBrushOpacity, currentBrushThickness, dispatch]);

  const toggleBrushMode = () => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Brush');
    dispatch(setCurrentPaintingMode('brush'));
  };

  const updateColorUsingSwatches = (color: string) => {
    unityContext?.send('HudManager', 'SetBrushColor', color);
    dispatch(setCurrentBrushColor(color));
    toggleBrushMode();
  };
  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mb-2">Palette</p>
      <ul className="grid grid-cols-[repeat(6,3rem)] max-h-44 w-full overflow-y-auto overflow-x-hidden pr-2">
        {swatches?.map((item) => (
          <li
            key={item.color}
            style={{ backgroundColor: item.color }}
            className="h-12 cursor-pointer relative"
            onClick={(e) => updateColorUsingSwatches(item.color)}
          ></li>
        ))}
      </ul>
    </>
  );
};
export default Swatches;
