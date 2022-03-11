import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentLightYAxis } from '../../store/reducers/painter.reducer';

const LightYAxis = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentLightYAxis = useAppSelector(
    (state) => state.painter.currentLightYAxis
  );
  const maxLightYAxis = useAppSelector((state) => state.painter.maxLightYAxis);
  const minLightYAxis = useAppSelector((state) => state.painter.minLightYAxis);

  const updateLightYAxisUsingInput = (value: number) => {
    dispatch(setCurrentLightYAxis(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLightRotationY', currentLightYAxis);
  }, [unityContext, currentLightYAxis]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mt-4 mb-2">
        Horizontal Rotation
      </p>
      <div className="flex items-center justify-evenly">
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
          min={minLightYAxis}
          max={maxLightYAxis}
          value={currentLightYAxis}
          changed={(value) => updateLightYAxisUsingInput(Number(value))}
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

export default LightYAxis;
