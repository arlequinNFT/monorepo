import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsTabs =
  | 'painting'
  | 'arlees'
  | 'stickers'
  | 'environment'
  | 'light'
  | 'partners';

interface State {
  activeSettingsTab: SettingsTabs;
}

const initialState: State = {
  activeSettingsTab: 'arlees',
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
