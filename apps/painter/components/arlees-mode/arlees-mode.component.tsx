import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentArleesMode } from '../../store/reducers/painter.reducer';

const ArleesMode = () => {
  const dispatch = useAppDispatch();

  const currentArleesMode = useAppSelector(
    (state) => state.painter.currentArleesMode
  );
  return (
    <ul className="grid grid-cols-2 w-full mb-2 bg-black-600 rounded-xl">
      <li
        className={`${
          currentArleesMode === 'species' ? 'bg-black-500 shadow-md' : "'"
        } col-span-1 flex flex-col items-center py-1 rounded-lg cursor-pointer`}
        onClick={(e) => dispatch(setCurrentArleesMode('species'))}
      >
        <p
          className={`${
            currentArleesMode === 'species' ? 'text-white' : 'text-black-200'
          }`}
        >
          Species
        </p>
      </li>

      <li
        className={`${
          currentArleesMode === 'poses' ? 'bg-black-500 shadow-md' : "'"
        } col-span-1 flex flex-col items-center py-1 rounded-lg  cursor-pointer`}
        onClick={(e) => dispatch(setCurrentArleesMode('poses'))}
      >
        <p
          className={`${
            currentArleesMode === 'poses' ? 'text-white' : 'text-black-200'
          }`}
        >
          Poses
        </p>
      </li>
    </ul>
  );
};

export default ArleesMode;
