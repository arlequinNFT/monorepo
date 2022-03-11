import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsTabs = 'painting' | 'background' | 'light';

interface State {
  activeSettingsTab: SettingsTabs;
}

const initialState: State = {
  activeSettingsTab: 'painting',
};

export const settingsTabsSlice = createSlice({
  name: 'settings-tabs',
  initialState,
  reducers: {
    setActiveSettingsTab: (state, action: PayloadAction<SettingsTabs>) => {
      state.activeSettingsTab = action.payload;
    },
  },
});
export const { setActiveSettingsTab } = settingsTabsSlice.actions;

export default settingsTabsSlice.reducer;
