import Image from 'next/image';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentPaintingMode } from './painting-mode.reducer';

const PaintingMode = () => {
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const currentPaintingMode = useAppSelector(
    (state) => state.paintingMode.currentPaintingMode
  );
  const currentBrushType = useAppSelector(
    (state) => state.painter.currentBrushType
  );

  const setBrushType = () => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Brush');
    dispatch(setCurrentPaintingMode('brush'));
  };
  const toggleBucketMode = () => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Bucket');
    dispatch(setCurrentPaintingMode('bucket'));
  };

  useHotkeys(
    'ctrl+b, command+b',
    () => {
      setBrushType();
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
    <>
      <p className="text-black-200 font-bold text-[0.875rem] my-2">Mode</p>
      <ul className="flex p-1 bg-black-600 rounded-xl">
        <li
          data-tip="CTRL + B"
          className={`${
            currentPaintingMode === 'brush' ? 'bg-black-500 shadow-md' : "'"
          } flex-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
          onClick={(e) => setBrushType()}
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
            Round Pen
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
            Fill
          </p>
        </li>
      </ul>
    </>
  );
};

export default PaintingMode;
