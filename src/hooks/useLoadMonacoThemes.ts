/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { MonacoAppThemeKey, monacoAppThemes } from "../constants";
import { useEditorSettingsStore } from "../store/useSettingStore";

/**
 * @description Load editor themes on demand
 */
export const useLoadMonacoThemes = () => {
  const monaco = useMonaco();

  const settings = useEditorSettingsStore(({ settings }) => settings);

  const loadedThemes = useRef(
    new Set<string>([MonacoAppThemeKey.VS_DARK, MonacoAppThemeKey.LIGHT]) //built-in themes
  );

  useEffect(() => {
    if (monaco) {
      (async () => {
        //load theme only for the first time
        if (settings.theme && !loadedThemes.current.has(settings.theme)) {
          //load theme
          const theme = monacoAppThemes.find(
            ({ key }) => key === settings.theme
          );

          if (!theme)
            throw new Error(`Invalid selected theme ${settings.theme}`);

          if (theme.fetchTheme) {
            //load theme
            const themeData = await theme.fetchTheme();

            monaco.editor.defineTheme(theme.key, themeData as any);
          }

          //asynchronously set the theme after load it

          monaco.editor.setTheme(theme.key);

          loadedThemes.current.add(settings.theme);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco, settings.theme]);
};
