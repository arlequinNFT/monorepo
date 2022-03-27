import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsTabs =
  | 'painting'
  | 'arlees'
  | 'stickers'
  | 'environment'
  | 'light';

interface State {
  activeSettingsTab: SettingsTabs;
}

const initialState: State = {
  activeSettingsTab: 'painting',
};

export const slice = createSlice({
  name: 'settings-tabs',
  initialState,
  reducers: {
    setActiveSettingsTab: (state, action: PayloadAction<SettingsTabs>) => {
      state.activeSettingsTab = action.payload;
    },
  },
});
export const { setActiveSettingsTab } = slice.actions;

export default slice.reducer;
