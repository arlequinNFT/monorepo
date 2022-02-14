import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
    decreaseBrushOpacity, increaseBrushOpacity, setCurrentBrushOpacity
} from '../../store/reducers/painter.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';

const BrushOpacity = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const dispatch = useAppDispatch();
  const currentBrushOpacity = useAppSelector(
    (state) => state.painter.currentBrushOpacity
  );
  const maxBrushOpacity = useAppSelector((state) => state.painter.maxBrushOpacity);
  const minBrushOpacity = useAppSelector((state) => state.painter.minBrushOpacity);

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
      <p className="text-black-200 font-bold text-[0.875rem]">Opacity</p>
      <div
        data-tip="Shortcut: Shift + Mousewheel"
        className="flex items-center justify-evenly p-1 mb-2"
      >
        <Image
          className="bg-black-500 rounded-full"
          src={`/icons/small.svg`}
          alt="Small icon"
          width="36px"
          height="36px"
        />
        <ComponentsInput
          className="w-4/5 mx-1"
          type="range"
          id="opacity"
          min={minBrushOpacity}
          max={maxBrushOpacity}
          value={currentBrushOpacity}
          changed={(value) => updateBrushOpacityUsingInput(Number(value))}
        />
        <Image
          className="bg-black-500 rounded-full"
          src={`/icons/big.svg`}
          alt="Big icon"
          width="36px"
          height="36px"
        />
      </div>
    </>
  );
};

export default BrushOpacity;
