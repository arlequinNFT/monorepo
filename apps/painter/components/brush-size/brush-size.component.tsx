import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
    decreaseBrushSize, increaseBrushSize, setCurrentBrushSize
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
      <p className="text-black-200 font-bold text-[0.875rem]">Size</p>
      <div
        data-tip="Shortcut: CTRL + Mousewheel"
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
          id="size"
          min={minBrushSize}
          max={maxBrushSize}
          value={currentBrushSize}
          changed={(value) => updateBrushSizeUsingInput(Number(value))}
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

export default BrushSize;
