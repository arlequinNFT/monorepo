import { useDebouncedCallback } from 'use-debounce';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setIntensity } from './ground-light-intensity.reducer';
import { ComponentsInput } from '@arlequin/components/input';
import { useEffect } from 'react';

const GroundLightIntensity = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const intensity = useAppSelector(
    (state) => state.groundLightIntensity.intensity
  );
  const min = useAppSelector((state) => state.groundLightIntensity.min);
  const max = useAppSelector((state) => state.groundLightIntensity.max);

  const updateIntensity = (value: number) => {
    dispatch(setIntensity(value));
  };
  useEffect(() => {
    unityContext?.send('HudManager', 'SetGroundLightIntensity', intensity);
  }, [unityContext, intensity]);
  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] mt-3 mb-1">
        Ground Light Intensity
      </p>

      <ComponentsInput
        className="mt-2"
        type="range"
        id="size"
        min={min}
        max={max}
        value={intensity}
        changed={(value) => updateIntensity(Number(value))}
      />
    </>
  );
};

export default GroundLightIntensity;
