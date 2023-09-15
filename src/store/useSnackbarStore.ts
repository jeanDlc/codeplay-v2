import { create } from "zustand";

import type { Snackbar, PartialBy } from "../types/index.types";

type SnackbarState = {
  snackbars: Snackbar[];
  trigger: (data: PartialBy<Omit<Snackbar, "id">, "variation">) => void;
  remove(id: Snackbar["id"]): void;
};

const DEFAULT_VARIATION: Snackbar["variation"] = "info";

export const useSnackbarStore = create<SnackbarState>((set) => ({
  snackbars: [],
  trigger({ message, variation }) {
    set((state) => {
      return {
        snackbars: [
          ...state.snackbars,
          {
            message,
            id: Math.random(),
            variation: variation ?? DEFAULT_VARIATION,
          },
        ],
      };
    });
  },
  remove(id) {
    set((state) => ({
      snackbars: state.snackbars.filter((al) => al.id !== id),
    }));
  },
}));
