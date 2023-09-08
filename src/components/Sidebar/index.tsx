import { clsx } from "clsx";

import { PageIcon } from "../Icons/PageIcon";
import { SettingsIcon } from "../Icons/SettingsIcon";
import classes from "./sidebar.module.css";
import { useState } from "react";
import { Settings } from "../Settings";

export const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <aside className={classes.sidebar}>
      <div className={classes.actionButtons}>
        <header>
          <button
            aria-label="Playground"
            title="Playground"
            data-action="close-settings-bar"
            className={clsx(
              classes.toolbarItem,
              !isSettingsOpen && classes.isActive
            )}
            onClick={() => setIsSettingsOpen(false)}
          >
            <PageIcon />
          </button>
        </header>
        <footer>
          <button
            title="Settings"
            aria-label="Settings"
            data-action="open-settings-bar"
            id="btn-settings"
            className={clsx(
              classes.toolbarItem,
              isSettingsOpen && classes.isActive
            )}
            onClick={() => setIsSettingsOpen((prev) => !prev)}
          >
            <SettingsIcon />
          </button>
        </footer>
      </div>
      {isSettingsOpen && (
        <div
          style={{
            overflowY: "auto",
            width: "350px",
          }}
        >
          <Settings />
        </div>
      )}
    </aside>
  );
};
