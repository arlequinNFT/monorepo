import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
    setBackgroundModeTo3D, setBackgroundModeToFlat
} from '../../store/reducers/painter.reducer';

const BackgroundMode = () => {
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const currentBackgroundMode = useAppSelector(
    (state) => state.painter.currentBackgroundMode
  );

  const enableBackground = () => {
    unityContext?.send('HudManager', 'EnableBackground');
    dispatch(setBackgroundModeTo3D());
  };
  const disableBackground = () => {
    unityContext?.send('HudManager', 'DisableBackground');
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
          onClick={(e) => disableBackground()}
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
          onClick={(e) => enableBackground()}
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
