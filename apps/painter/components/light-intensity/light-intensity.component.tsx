import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentLightIntensity } from '../../store/reducers/painter.reducer';

const LightIntensity = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const currentLightIntensity = useAppSelector(
    (state) => state.painter.currentLightIntensity
  );
  const maxLightIntensity = useAppSelector((state) => state.painter.maxLightIntensity);
  const minLightIntensity = useAppSelector((state) => state.painter.minLightIntensity);

  const updateLightIntensityUsingInput = (value: number) => {
    dispatch(setCurrentLightIntensity(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLightIntensity', currentLightIntensity);
  }, [unityContext, currentLightIntensity]);

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">Intensity</p>
      <div
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
          min={minLightIntensity}
          max={maxLightIntensity}
          value={currentLightIntensity}
          changed={(value) => updateLightIntensityUsingInput(Number(value))}
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

export default LightIntensity;
