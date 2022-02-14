import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
    decreaseBrushHardness, increaseBrushHardness, setCurrentBrushHardness
} from '../../store/reducers/painter.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';

const BrushHardness = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentBrushHardness = useAppSelector(
    (state) => state.painter.currentBrushHardness
  );
  const maxBrushHardness = useAppSelector((state) => state.painter.maxBrushHardness);
  const minBrushHardness = useAppSelector((state) => state.painter.minBrushHardness);

  const updateBrushHardnessUsingInput = (value: number) => {
    dispatch(setCurrentBrushHardness(value));
  }

   useEffect(() => {
     unityContext?.send('HudManager', 'UpdateHardness', currentBrushHardness);
   }, [unityContext, currentBrushHardness]);

   useEffect(() => {
     if (keyPress?.alt) {
       if (scrollingDirection?.up) {
         dispatch(increaseBrushHardness());
       }
       if (scrollingDirection?.down) {
         dispatch(decreaseBrushHardness());
       }
     }
   }, [scrollingDirection, keyPress, unityContext, dispatch]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">Hardness</p>
      <div
        data-tip="Shortcut: Alt + Mousewheel"
        className="flex items-center justify-evenly p-1"
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
          id="hardness"
          min={minBrushHardness}
          max={maxBrushHardness}
          value={currentBrushHardness}
          changed={(value) => updateBrushHardnessUsingInput(Number(value))}
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

export default BrushHardness;
