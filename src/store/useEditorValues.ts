import { create } from "zustand";
import { url } from "../utils/urlHelper";
import { EditorValues } from "../types/index.types";
import { useSnackbarStore } from "./useSnackbarStore";

type EditorValuesState = {
  values: EditorValues;
  update: (key: keyof EditorValues, value?: string) => void;
};

export const useEditorValuesStore = create<EditorValuesState>((set) => ({
  values: (() => {
    try {
      return url.getDecodedValues();
    } catch (error) {
      useSnackbarStore.getState().trigger({
        message: "Invalid URL: could not read the encoded url",
        variation: "danger",
      });
      //return default value
      return { css: "", html: "", js: "" };
    }
  })(),
  update(key, value) {
    set((state) => {
      const newValues: EditorValues = {
        ...state.values,
        [key]: value,
      };
      url.saveEncodedValues(newValues);
      return {
        values: newValues,
      };
    });
  },
}));
