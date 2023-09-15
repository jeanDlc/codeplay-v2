import { useSnackbarStore } from "../../store/useSnackbarStore";

import { Snackbar } from "./Snackbar";

import classes from "./snackbar.module.css";

export const SnackbarWrapper = () => {
  const snackbars = useSnackbarStore(({ snackbars }) => snackbars);
  const removeSnackbar = useSnackbarStore(({ remove }) => remove);

  return (
    <div className={classes["snackbar-container"]}>
      {snackbars.map((al) => (
        <Snackbar snackbar={al} key={al.id} onClose={removeSnackbar} />
      ))}
    </div>
  );
};
