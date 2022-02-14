import Image from 'next/image';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentPaintingMode } from '../../store/reducers/painter.reducer';

const PaintingMode = () => {
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const currentPaintingMode = useAppSelector(
    (state) => state.painter.currentPaintingMode
  );
  const currentBrushType = useAppSelector(
    (state) => state.painter.currentBrushType
  );

  const toggleBrushMode = () => {
    unityContext?.send('HudManager', 'SetBrushType', currentBrushType);
    dispatch(setCurrentPaintingMode('brush'));
  };
  const toggleBucketMode = () => {
    dispatch(setCurrentPaintingMode('bucket'));
    unityContext?.send('HudManager', 'ToggleBucketMode');
  };


  useHotkeys(
    'ctrl+b, command+b',
    () => {
      toggleBrushMode();
    },
    [unityContext]
  );
  useHotkeys(
    'ctrl+g, command+g',
    (event) => {
      event.preventDefault();
      toggleBucketMode();
    },
    [unityContext]
  );

  return (
    <ul className="flex p-1 bg-black-600 rounded-xl">
      <li
        data-tip="CTRL + B"
        className={`${
          currentPaintingMode === 'brush' ? 'bg-black-500 shadow-md' : "'"
        } flex-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
        onClick={(e) => toggleBrushMode()}
      >
        <Image
          src={`/icons/brush_${
            currentPaintingMode === 'brush' ? 'active' : 'inactive'
          }.svg`}
          alt="Brush icon"
          width="36px"
          height="36px"
        />
        <p
          className={`${
            currentPaintingMode === 'brush' ? 'text-white' : 'text-black-200'
          }`}
        >
          Brush
        </p>
      </li>

      <li
        data-tip="CTRL + G"
        className={`${
          currentPaintingMode === 'bucket' ? 'bg-black-500 shadow-md' : "'"
        } flex-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
        onClick={(e) => toggleBucketMode()}
      >
        <Image
          src={`/icons/bucket_${
            currentPaintingMode === 'bucket' ? 'active' : 'inactive'
          }.svg`}
          alt="Bucket icon"
          width="36px"
          height="36px"
        />
        <p
          className={`${
            currentPaintingMode === 'bucket' ? 'text-white' : 'text-black-200'
          }`}
        >
          Bucket
        </p>
      </li>
    </ul>
  );
};

export default PaintingMode;
