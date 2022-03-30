import Image from 'next/image';
import { useEffect } from 'react';

import { ComponentsInput } from '@arlequin/components/input';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {} from '../../store/reducers/ui.reducer';
import { setXRotation, setYRotation } from './arlee-lights-rotation.reducer';

const ArleeLightsRotation = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const xRotation = useAppSelector(
    (state) => state.arleeLightsRotation.xRotation
  );
  const xMin = useAppSelector((state) => state.arleeLightsRotation.xMin);
  const xMax = useAppSelector((state) => state.arleeLightsRotation.xMax);
  const yRotation = useAppSelector(
    (state) => state.arleeLightsRotation.yRotation
  );
  const yMin = useAppSelector((state) => state.arleeLightsRotation.yMin);
  const yMax = useAppSelector((state) => state.arleeLightsRotation.yMax);
  const updateXRotation = (value: number) => {
    dispatch(setXRotation(value));
  };
  const updateYRotation = (value: number) => {
    dispatch(setYRotation(value));
  };

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLightsXRotation', xRotation);
  }, [unityContext, xRotation]);

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateLightsRotationY', yRotation);
  }, [unityContext, yRotation]);

  return (
    <>
      {/* <p className="text-black-200 font-bold text-[0.875rem] mb-2">Vertical</p>
      <ComponentsInput
        type="range"
        id="size"
        min={xMin}
        max={xMax}
        value={xRotation}
        changed={(value) => updateXRotation(Number(value))}
      /> */}

      <p className="text-black-200 font-bold text-[0.875rem] my-2">
        Horizontal
      </p>
      <ComponentsInput
        type="range"
        id="size"
        min={yMin}
        max={yMax}
        value={yRotation}
        changed={(value) => updateYRotation(Number(value))}
      />
    </>
  );
};

export default ArleeLightsRotation;
