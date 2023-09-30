import { lazy, Suspense } from "react";
import { useSnackbarStore } from "../../store/useSnackbarStore";

const Snackbar = lazy(() => import("./Snackbar"));

import classes from "./snackbar.module.css";

export const SnackbarWrapper = () => {
  const snackbars = useSnackbarStore(({ snackbars }) => snackbars);
  const removeSnackbar = useSnackbarStore(({ remove }) => remove);

  return (
    <div className={classes["snackbar-container"]}>
      <Suspense fallback="Loading snackbars">
        {snackbars.map((al) => (
          <Snackbar snackbar={al} key={al.id} onClose={removeSnackbar} />
        ))}
      </Suspense>
    </div>
  );
};
