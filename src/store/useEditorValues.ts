import { create } from "zustand";
import { url } from "../utils/urlHelper";
import { EditorValues } from "../types/index.types";

type EditorValuesState = {
  values: EditorValues;
  update: (key: keyof EditorValues, value?: string) => void;
};

export const useEditorValuesStore = create<EditorValuesState>((set) => ({
  values: url.getDecodedValues(),
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
