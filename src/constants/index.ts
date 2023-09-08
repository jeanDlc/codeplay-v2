export const EDITOR_COMMON_OPTIONS = {
  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
  bracketPairColorization: { enabled: true },
} as const;

export enum MonacoAppThemeKey {
  VS_DARK = "vs-dark",
  LIGHT = "light",
  GITHUB_DARK = "github-dark",
  DRACULA = "dracula",
  MONOKAI_BRIGHT = "monokai-bright",
  SOLARIZED_DARK = "solarized-dark",
}

export const monacoAppThemes: Array<{
  key: MonacoAppThemeKey;
  name: string;
}> = [
  { key: MonacoAppThemeKey.VS_DARK, name: "VS Dark" },
  { key: MonacoAppThemeKey.LIGHT, name: "Light" },
  { key: MonacoAppThemeKey.MONOKAI_BRIGHT, name: "Monokai Bright" },
  { key: MonacoAppThemeKey.GITHUB_DARK, name: "Github Dark" },
  { key: MonacoAppThemeKey.SOLARIZED_DARK, name: "Solarized Dark" },
  { key: MonacoAppThemeKey.DRACULA, name: "Dracula" },
];
