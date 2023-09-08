import type { EditorProps } from "@monaco-editor/react";

import { persist, createJSONStorage } from "zustand/middleware";

import { create } from "zustand";
import { EDITOR_COMMON_OPTIONS, MonacoAppThemeKey } from "../constants";

type Settings = NonNullable<EditorProps["options"]>;

const INITIAL_STATE = {
  fontSize: 17,
  lineNumbers: "off",
  wordWrap: "off",
  tabSize: 4,
  cursorStyle: "line",
  theme: MonacoAppThemeKey.VS_DARK,
} as const;

const INITIAL_SETTINGS: Settings = {
  ...EDITOR_COMMON_OPTIONS,
  ...INITIAL_STATE,
};

interface SettingState {
  settings: Settings;
  changeSetting: (key: string, value: string) => void;
}

export const useEditorSettingsStore = create(
  persist<SettingState>(
    (set) => ({
      settings: INITIAL_SETTINGS,
      changeSetting: (key: string, value: string) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        }));
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
