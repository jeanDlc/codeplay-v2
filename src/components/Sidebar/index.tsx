import { clsx } from "clsx";

import { PageIcon } from "../Icons/PageIcon";
import { SettingsIcon } from "../Icons/SettingsIcon";
import classes from "./sidebar.module.css";
import { useState } from "react";
import { Settings } from "../Settings";
import { RedirectionIcon } from "../Icons/RedirectionIcon";
import { usePreview } from "../../hooks/usePreview";

export const Sidebar = () => {
  const [settingBarAnimation, setSettingBarAnimation] = useState<
    "show" | "hide" | "none"
  >("none");

  const toggleSettings = () => {
    setSettingBarAnimation((prev) => {
      if (prev === "show") return "hide";
      else return "show";
    });
  };

  const { showPreview } = usePreview();

  return (
    <aside className={classes.sidebar}>
      <div className={classes.actionButtons}>
        <header>
          <button
            aria-label="Playground"
            title="Playground"
            className={clsx(
              classes.toolbarItem,
              ["hide", "none"].includes(settingBarAnimation) && classes.isActive
            )}
            onClick={() => {
              if (settingBarAnimation === "show") {
                setSettingBarAnimation("hide");
              }
            }}
          >
            <PageIcon />
          </button>
        </header>
        <footer>
          <button
            title="Preview"
            aria-label="Preview"
            className={clsx(classes.toolbarItem)}
            onClick={showPreview}
          >
            <RedirectionIcon />
          </button>
          <button
            title="Settings"
            aria-label="Settings"
            className={clsx(
              classes.toolbarItem,
              settingBarAnimation === "show" && classes.isActive
            )}
            onClick={toggleSettings}
          >
            <SettingsIcon />
          </button>
        </footer>
      </div>
      <div
        className={clsx(
          classes.settingsContainer,
          settingBarAnimation === "show" && classes.show,
          settingBarAnimation === "hide" && classes.hide
        )}
      >
        <Settings />
      </div>
    </aside>
  );
};
