import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentBrushColor } from '../brush-color/brush-color.reducer';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';
import { addColorToSwatches } from './swatches.reducer';

const Swatches = () => {
  const dispatch = useAppDispatch();
  //#region Selectors
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentBrushType = useAppSelector(
    (state) => state.painter.currentBrushType
  );
  const swatches = useAppSelector((state) => state.swatches.swatches);
  //#endregion

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendBrushColor', async (event) => {
        dispatch(addColorToSwatches(event));
      });
    }
  }, [unityContext, dispatch]);

  const toggleBrushMode = () => {
    unityContext?.send('HudManager', 'SetBrushType', currentBrushType);
    dispatch(setCurrentPaintingMode('brush'));
  };

  const updateColorUsingSwatches = (color: string) => {
    unityContext?.send('HudManager', 'SetBrushColor', color);
    dispatch(setCurrentBrushColor(color));
    toggleBrushMode();
  };
  return (
    <ul className="absolute flex gap-x-2 p-1">
      {swatches?.map((color) => (
        <li
          key={color}
          style={{ backgroundColor: color }}
          className="h-8 w-8 rounded-md cursor-pointer"
          onClick={(e) => updateColorUsingSwatches(color)}
        ></li>
      ))}
    </ul>
  );
};
export default Swatches;
