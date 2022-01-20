// import React, { useEffect } from 'react';

// import { useAppDispatch, useAppSelector } from '../../store/hook';
// import {
//   setArlees,
//   setCurrentArlee,
// } from '../../store/reducers/painter.reducer';
// import styles from './arlees-list.module.scss';

// interface Props {
//   loadArlee: (arlee: string) => void;
// }

// const ArleesList = ({ loadArlee }: Props) => {
//   //#region Selectors
//   const dispatch = useAppDispatch();

//   const poses = useAppSelector((state) => state.painter.poses);
//   const currentPose = useAppSelector((state) => state.painter.currentPose);
//   //#endregion

//   useEffect(() => {
//     if (arlees.length === 0) {
//       const list: any[] = [
//         {
//           image: '/images/cacatoes.png',
//           species: 'cacatoes',
//         },
//         {
//           image: '/images/pig.png',
//           species: 'pig',
//         },
//         {
//           image: '/images/turtle.png',
//           species: 'turtle',
//         },
//         {
//           image: '/images/deer.png',
//           species: 'deer',
//         },
//         {
//           image: '/images/elephant.png',
//           species: 'elephant',
//         },
//       ];
//       dispatch(setArlees(list));
//       dispatch(setCurrentArlee(list[0]));
//     }
//   }, [dispatch, arlees.length]);

//   return (
//     <div
//       id={styles['poses-list']}
//       className="grid space-y-4 absolute -inset-0 overflow-y-scroll"
//     >
//       {poses.map((pose, key) => {
//         return (
//           <div
//             key={key}
//             className={`flex justify-center items-center rounded-2xl cursor-pointer bg-slate-200 ${
//               currentPose.label === pose.label
//                 ? 'outline outline-8 outline-grey-300'
//                 : ''
//             }`}
//             onClick={(e) => {
//               dispatch(setCurrentPose(pose));
//               setPose(pose.label);
//             }}
//           >
//             <img
//               className="h-52 object-contain rounded-2xl"
//               src={pose.image}
//               alt={pose.label}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default ArleesList;
