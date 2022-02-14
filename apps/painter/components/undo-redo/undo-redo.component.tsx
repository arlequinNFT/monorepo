import Image from 'next/image';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAppSelector } from '../../store/hook';

const UndoRedo = () => {
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const redo = () => unityContext?.send('HudManager', 'Redo');
  const undo = () => unityContext?.send('HudManager', 'Undo');


  useHotkeys('ctrl+z, command+z', () => undo(), [unityContext]);
  useHotkeys('ctrl+y, command+y', () => redo(), [unityContext]);

  return (
    <div className="flex items-center justify-end">
      <div className="flex gap-x-2">
        <Image
          data-tip="Undo | CTRL + Z"
          onClick={(e) => undo()}
          className={`bg-black-500 hover:bg-black-400 transition-colors rounded-full cursor-pointer`}
          src="/icons/undo.svg"
          alt="Undo icon"
          width="28px"
          height="28px"
        />
        <Image
          data-tip="Redo | CTRL + Y"
          onClick={(e) => redo()}
          className={`bg-black-500 hover:bg-black-400 transition-colors rounded-full cursor-pointer`}
          src="/icons/redo.svg"
          alt="Redo icon"
          width="28px"
          height="28px"
        />
      </div>
    </div>
  );
};

export default UndoRedo;
