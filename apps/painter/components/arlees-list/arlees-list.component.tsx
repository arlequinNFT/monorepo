import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setArlees, setCurrentArlee } from '../../store/reducers/painter.reducer';
import styles from './arlees-list.module.scss';

interface Props {
  loadArlee: (arlee: string) => void;
}

const ArleesList = ({ loadArlee }: Props) => {
  //#region Selectors
  const dispatch = useAppDispatch();

  const arlees = useAppSelector((state) => state.painter.arlees);
  const currentArlee = useAppSelector((state) => state.painter.currentArlee);
  //#endregion

  useEffect(() => {
    if (arlees.length === 0) {
      const list: any[] = [
        {
          image: '',
          species: 'dog',
        },
        {
          image: '/images/cacatoes.png',
          species: 'cacatoes',
        },
        {
          image: '/images/pig.png',
          species: 'pig',
        },
        {
          image: '/images/turtle.png',
          species: 'turtle',
        },
        {
          image: '/images/deer.png',
          species: 'deer',
        },
        {
          image: '/images/elephant.png',
          species: 'elephant',
        },
      ];
      dispatch(setArlees(list));
      dispatch(setCurrentArlee(list[0]));
    }
  }, [dispatch, arlees.length]);

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
              currentArlee?.species === arlee.species ? 'border-black-300' : ''
            }`}
            src={arlee.image}
            alt={arlee.species}
            onClick={(e) => {
              dispatch(setCurrentArlee(arlee));
              loadArlee(arlee.species);
            }}
          />
        );
      })}
    </div>
  );
};
export default ArleesList;
