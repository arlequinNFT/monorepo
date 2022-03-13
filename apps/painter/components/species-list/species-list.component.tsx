import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentArlee } from './species-list.reducer';

const SpeciesList = () => {
  const dispatch = useAppDispatch();
  //#region Selectors
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const arlees = useAppSelector((state) => state.speciesList.arlees);
  const currentArlee = useAppSelector(
    (state) => state.speciesList.currentArlee
  );
  const currentPose = useAppSelector((state) => state.posesList.currentPose);
  //#endregion

  const loadArlee = (species: string) =>
    unityContext?.send('HudManager', 'LoadMetaPet', species);

  return (
    <div className="grid space-y-4 absolute -inset-0 overflow-y-scroll pr-2">
      {arlees.map((arlee, key) => {
        return (
          <img
            key={key}
            className={`h-52 w-full object-contain rounded-2xl flex justify-center items-center rounded-2xl cursor-pointer border border-8 bg-slate-200 ${
              currentArlee === arlee ? 'border-black-300' : ''
            }`}
            src={`/images/${arlee}/${currentPose}.webp`}
            alt={arlee}
            onClick={(e) => {
              dispatch(setCurrentArlee(arlee));
              loadArlee(arlee);
            }}
          />
        );
      })}
    </div>
  );
};
export default SpeciesList;
