import { BiLandscape, BiSticker } from 'react-icons/bi';
import { FaPaintBrush } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';

import { Tab } from '@chakra-ui/tabs';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setActiveSettingsTab } from './settings-tabs.reducer';

const SettingsTabs = () => {
  const dispatch = useAppDispatch();

  const activeSettingsTab = useAppSelector(
    (state) => state.settingsTabs.activeSettingsTab
  );

  return (
    <>
      <Tab
        className={`${
          activeSettingsTab === 'painting' ? 'border-b border-white' : ''
        } flex flex-col text-white p-4`}
        onClick={(e) => dispatch(setActiveSettingsTab('painting'))}
      >
        <FaPaintBrush></FaPaintBrush>
      </Tab>
      <Tab
        className={`${
          activeSettingsTab === 'stickers' ? 'border-b border-white' : ''
        } flex flex-col text-white p-4`}
        onClick={(e) => dispatch(setActiveSettingsTab('stickers'))}
      >
        <BiSticker></BiSticker>
      </Tab>
      <Tab
        className={`${
          activeSettingsTab === 'background' ? 'border-b border-white' : ''
        } flex flex-col text-white p-4`}
        onClick={(e) => dispatch(setActiveSettingsTab('background'))}
      >
        <BiLandscape></BiLandscape>
      </Tab>
      <Tab
        className={`${
          activeSettingsTab === 'light' ? 'border-b border-white' : ''
        } flex flex-col text-white p-4`}
        onClick={(e) => dispatch(setActiveSettingsTab('light'))}
      >
        <MdOutlineLightMode></MdOutlineLightMode>
      </Tab>
    </>
  );
};

export default SettingsTabs;
