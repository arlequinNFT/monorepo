import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentArlee } from '../../store/reducers/painter.reducer';
import styles from './arlees-list.module.scss';

interface Props {
  loadArlee: (arlee: string) => void;
}

const ArleesList = ({ loadArlee }: Props) => {
  //#region Selectors
  const dispatch = useAppDispatch();

  const arlees = useAppSelector((state) => state.painter.arlees);
  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  const currentPose = useAppSelector((state) => state.painter.currentPose);
  //#endregion

  return (
    <div
      id={styles['arlees-list']}
      className="grid space-y-4 absolute -inset-0 overflow-y-scroll pr-2"
    >
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
export default ArleesList;
