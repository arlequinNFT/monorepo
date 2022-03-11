import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentLightXAxis } from '../../store/reducers/painter.reducer';

const LightXAxis = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentLightXAxis = useAppSelector(
    (state) => state.painter.currentLightXAxis
  );
  const maxLightXAxis = useAppSelector((state) => state.painter.maxLightXAxis);
  const minLightXAxis = useAppSelector((state) => state.painter.minLightXAxis);

  const updateLightXAxisUsingInput = (value: number) => {
    dispatch(setCurrentLightXAxis(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLightRotationX', currentLightXAxis);
  }, [unityContext, currentLightXAxis]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mt-4 mb-2">
        Vertical Rotation
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
          min={minLightXAxis}
          max={maxLightXAxis}
          value={currentLightXAxis}
          changed={(value) => updateLightXAxisUsingInput(Number(value))}
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

export default LightXAxis;
