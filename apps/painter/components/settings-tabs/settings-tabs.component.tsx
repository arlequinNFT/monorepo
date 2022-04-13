import { BiLandscape, BiSticker } from 'react-icons/bi';
import { FaPaintBrush } from 'react-icons/fa';
import { MdOutlineLightMode, MdPets } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setActiveSettingsTab } from './settings-tabs.reducer';

const SettingsTabs = () => {
  const dispatch = useAppDispatch();

  const activeSettingsTab = useAppSelector(
    (state) => state.settingsTabs.activeSettingsTab
  );

  return (
    <>
      <div
        className={`flex justify-center items-center p-4 cursor-pointer text-white ${
          activeSettingsTab === 'arlees' ? 'bg-black-700' : 'bg-black-600'
        }`}
        onClick={(e) => dispatch(setActiveSettingsTab('arlees'))}
      >
        <MdPets size="1.5rem"></MdPets>
      </div>
      <div
        className={`flex justify-center items-center p-4 cursor-pointer text-white ${
          activeSettingsTab === 'painting' ? 'bg-black-700' : 'bg-black-600'
        }`}
        onClick={(e) => dispatch(setActiveSettingsTab('painting'))}
      >
        <FaPaintBrush size="1.5rem"></FaPaintBrush>
      </div>

      <div
        className={`flex justify-center items-center p-4 cursor-pointer text-white ${
          activeSettingsTab === 'stickers' ? 'bg-black-700' : 'bg-black-600'
        }`}
        onClick={(e) => dispatch(setActiveSettingsTab('stickers'))}
      >
        <BiSticker size="1.5rem"></BiSticker>
      </div>
      <div
        className={` flex justify-center items-center p-4 cursor-pointer text-white  ${
          activeSettingsTab === 'environment' ? 'bg-black-700' : 'bg-black-600'
        }`}
        onClick={(e) => dispatch(setActiveSettingsTab('environment'))}
      >
        <BiLandscape size="1.5rem"></BiLandscape>
      </div>
      <div
        className={` flex justify-center items-center p-4 cursor-pointer text-white rounded-bl-xl   ${
          activeSettingsTab === 'light' ? 'bg-black-700' : 'bg-black-600'
        }`}
        onClick={(e) => dispatch(setActiveSettingsTab('light'))}
      >
        <MdOutlineLightMode size="1.5rem"></MdOutlineLightMode>
      </div>
    </>
  );
};

export default SettingsTabs;
