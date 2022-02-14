import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Pose, setCurrentPose } from '../../store/reducers/painter.reducer';
import styles from './poses-list.module.scss';

const PosesList = () => {
  const dispatch = useAppDispatch();
  //#region Selectors
    const unityContext = useAppSelector((state) => state.painter.unityContext);


  const poses = useAppSelector((state) => state.painter.poses);
  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  const currentPose = useAppSelector((state) => state.painter.currentPose);
  //#endregion

  const setPose = (pose: Pose) =>
    unityContext?.send('HudManager', 'SetPose', pose);


  return (
    <div
      id={styles['poses-list']}
      className="grid space-y-4 absolute -inset-0 overflow-y-scroll pr-2"
    >
      {poses.map((pose, key) => {
        return (
          <img
            key={key}
            className={`h-52 w-full object-contain rounded-2xl flex justify-center items-center rounded-2xl cursor-pointer border border-8 bg-slate-200 ${
              currentPose === pose ? 'border-black-300' : ''
            }`}
            src={`/images/${currentArlee}/${pose}.webp`}
            alt={pose}
            onClick={(e) => {
              dispatch(setCurrentPose(pose));
              setPose(pose);
            }}
          />
        );
      })}
    </div>
  );
};
export default PosesList;
