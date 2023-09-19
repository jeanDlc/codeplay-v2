import { useRef, useEffect } from "react";
import clsx from "clsx";

import { CloseIcon } from "../Icons/CloseIcon";
import { InfoCircleIcon } from "../Icons/InfoCircleIcon";
import { InfoTriangleIcon } from "../Icons/InfoTriangleIcon";
import classes from "./snackbar.module.css";

import type { Snackbar as SnackbarType } from "../../types/index.types";

const ANIMATION_TIME_IN_MS = 400;
const NOTIFICATION_DURATION_IN_MS = 3000;

const assetsByVariationMap = {
  info: {
    styles: classes["snackbar-info"],
    Icon: <InfoCircleIcon color="white" outline />,
  },
  warning: {
    styles: classes["snackbar-warning"],
    Icon: <InfoTriangleIcon color="white" outline />,
  },
  danger: {
    styles: classes["snackbar-danger"],
    Icon: <InfoCircleIcon color="white" outline />,
  },
} as const;

export const Snackbar = ({
  snackbar,
  onClose,
}: {
  snackbar: SnackbarType;
  onClose: (id: string | number) => void;
}) => {
  const { id, message, variation } = snackbar;

  const { Icon, styles } = assetsByVariationMap[variation];

  const snackbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (snackbarRef.current) {
      snackbarRef.current.classList.add(classes.show);
      setTimeout(() => {
        handleCloseSnackbar();
      }, NOTIFICATION_DURATION_IN_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSnackbar = () => {
    if (snackbarRef.current) {
      snackbarRef.current.classList.remove(classes.show);
      snackbarRef.current.classList.add(classes.hide);
      setTimeout(() => {
        onClose(id);
      }, ANIMATION_TIME_IN_MS / 2);
    }
  };

  return (
    <div
      ref={snackbarRef}
      data-colo="red"
      className={clsx(classes.snackbar, styles)}
    >
      <div className={classes["icon-wrapper"]} aria-label="Info icon">
        {Icon}
      </div>
      <p> {message} </p>
      <button
        aria-label="Close snackbar"
        className={classes["close-button"]}
        onClick={handleCloseSnackbar}
        title="Close snackbar"
      >
        <CloseIcon color="rgba(255,255,255, 0.5)" />
      </button>
    </div>
  );
};
