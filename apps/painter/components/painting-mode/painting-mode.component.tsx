import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  BrushDecal,
  setCurrentBrushDecal,
  setCurrentPaintingMode,
} from './painting-mode.reducer';

const PaintingMode = () => {
  const dispatch = useAppDispatch();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const currentPaintingMode = useAppSelector(
    (state) => state.paintingMode.currentPaintingMode
  );
  const currentBrushDecal = useAppSelector(
    (state) => state.paintingMode.currentBrushDecal
  );
  const setBrushType = (brushDecal: BrushDecal) => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Brush');
    unityContext?.send('HudManager', 'SetBrushDecal', brushDecal);
    dispatch(setCurrentPaintingMode('brush'));
    dispatch(setCurrentBrushDecal(brushDecal));
  };
  const toggleBucketMode = () => {
    unityContext?.send('HudManager', 'SetPaintingMode', 'Bucket');
    dispatch(setCurrentPaintingMode('bucket'));
  };

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem] my-2">Mode</p>
      <ul className="flex p-1 bg-black-600 rounded-xl">
        <li
          data-tip="CTRL + B"
          className={`${
            currentBrushDecal === 'hard' ? 'bg-black-500 shadow-md' : "'"
          } flex-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
          onClick={(e) => setBrushType('hard')}
        >
          <Image
            src={`/icons/brush_${
              currentBrushDecal === 'hard' ? 'active' : 'inactive'
            }.svg`}
            alt="Brush icon"
            width="36px"
            height="36px"
          />
          <p
            className={`${
              currentBrushDecal === 'hard' ? 'text-white' : 'text-black-200'
            }`}
          >
            Hard Pen
          </p>
        </li>
        <li
          data-tip="CTRL + B"
          className={`${
            currentBrushDecal === 'soft' ? 'bg-black-500 shadow-md' : "'"
          } flex-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
          onClick={(e) => setBrushType('soft')}
        >
          <Image
            src={`/icons/brush_${
              currentBrushDecal === 'soft' ? 'active' : 'inactive'
            }.svg`}
            alt="Brush icon"
            width="36px"
            height="36px"
          />
          <p
            className={`${
              currentBrushDecal === 'soft' ? 'text-white' : 'text-black-200'
            }`}
          >
            Soft Pen
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
