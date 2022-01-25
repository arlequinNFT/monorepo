import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentPose } from '../../store/reducers/painter.reducer';
import styles from './poses-list.module.scss';

interface Props {
  setPose: (pose: string) => void;
}

const PosesList = ({ setPose }: Props) => {
  //#region Selectors
  const dispatch = useAppDispatch();

  const poses = useAppSelector((state) => state.painter.poses);
  const currentPose = useAppSelector((state) => state.painter.currentPose);
  //#endregion

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
              currentPose?.label === pose.label ? 'border-black-300' : ''
            }`}
            src={pose.image}
            alt={pose.label}
            onClick={(e) => {
              dispatch(setCurrentPose(pose));
              setPose(pose.label);
            }}
          />
        );
      })}
    </div>
  );
};
export default PosesList;
