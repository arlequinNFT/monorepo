import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  setBackgroundModeTo3D,
  setBackgroundModeToFlat,
} from './background-mode.reducer';

const BackgroundMode = () => {
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const currentBackgroundMode = useAppSelector(
    (state) => state.backgroundMode.currentBackgroundMode
  );

  const setBackgroundModeTo3DFn = () => {
    unityContext?.send('HudManager', 'SetBackgroundModeTo3D');
    dispatch(setBackgroundModeTo3D());
  };
  const setBackgroundModeToFlatFn = () => {
    unityContext?.send('HudManager', 'SetBackgroundModeToFlat');
    dispatch(setBackgroundModeToFlat());
  };

  return (
    <div className="flex flex-col">
      <p className="text-black-200 font-bold text-[0.875rem] my-2">Mode</p>

      <ul className="flex bg-black-600 rounded-lg">
        <li
          className={`${
            currentBackgroundMode === 'flat' ? 'bg-black-500 shadow-md' : ''
          } flex-1 flex flex-col items-center rounded-lg p-2 cursor-pointer`}
          onClick={(e) => setBackgroundModeToFlatFn()}
        >
          <p
            className={`${
              currentBackgroundMode === 'flat' ? 'text-white' : 'text-black-200'
            } text-sm`}
          >
            Flat
          </p>
        </li>

        <li
          className={`${
            currentBackgroundMode === '3d' ? 'bg-black-500 shadow-md' : ''
          } flex-1 flex flex-col items-center rounded-lg p-2 cursor-pointer`}
          onClick={(e) => setBackgroundModeTo3DFn()}
        >
          <p
            className={`${
              currentBackgroundMode === '3d' ? 'text-white' : 'text-black-200'
            } text-sm`}
          >
            3D
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BackgroundMode;