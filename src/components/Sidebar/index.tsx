import { useRef, lazy, Suspense } from "react";
import { clsx } from "clsx";

import { PageIcon } from "../Icons/PageIcon";
import { SettingsIcon } from "../Icons/SettingsIcon";
import classes from "./sidebar.module.css";
import { useState } from "react";
import { RedirectionIcon } from "../Icons/RedirectionIcon";
import { usePreview } from "../../hooks/usePreview";
import { ClipBoardIcon } from "../Icons/ClipBoardIcon";
import { useSnackbarStore } from "../../store/useSnackbarStore";

const Settings = lazy(() => import("../Settings"));

type View = "playground" | "settings";

export const Sidebar = () => {
  const toolBarRef = useRef<HTMLDivElement>(null);

  const [currentView, setCurrentView] = useState<View>("playground");

  const closeToolbar = () => {
    if (toolBarRef.current) {
      toolBarRef.current.classList.add(classes.hide);
      toolBarRef.current.classList.remove(classes.show);
      setCurrentView("playground");
    }
  };

  const toggleToolbar = (view: View) => {
    if (toolBarRef.current) {
      if (!toolBarRef.current.classList.contains(classes.show)) {
        //show toolbar
        toolBarRef.current.classList.add(classes.show);
        toolBarRef.current.classList.remove(classes.hide);
        setCurrentView(view);
      } else {
        //hide toolbar
        //initial view
        closeToolbar();
      }
    }
  };
  const triggerSnackbar = useSnackbarStore(({ trigger }) => trigger);

  const { showPreview } = usePreview();

  const copyUrlToClipBoard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        triggerSnackbar({
          message: "Correctly copied to clipboard",
        });
      })
      .catch((err) => {
        console.log("Error when copying to clipboard", err);
      });
  };

  return (
    <aside className={classes.sidebar}>
      <div className={classes.actionButtons}>
        <header>
          <button
            aria-label="Playground"
            title="Playground"
            className={clsx(
              classes.toolbarItem,
              currentView === "playground" && classes.isActive
            )}
            onClick={() => {
              if (currentView !== "playground") {
                closeToolbar();
              }
            }}
          >
            <PageIcon />
          </button>
        </header>
        <footer>
          <button
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
            className={classes.toolbarItem}
            onClick={copyUrlToClipBoard}
          >
            <ClipBoardIcon />
          </button>
          <button
            title="Preview"
            aria-label="Preview"
            className={classes.toolbarItem}
            onClick={showPreview}
          >
            <RedirectionIcon />
          </button>
          <button
            title="Settings"
            aria-label="Settings"
            className={clsx(
              classes.toolbarItem,
              currentView === "settings" && classes.isActive
            )}
            onClick={() => toggleToolbar("settings")}
          >
            <SettingsIcon />
          </button>
        </footer>
      </div>
      <div ref={toolBarRef} className={classes.settingsContainer}>
        <Suspense fallback={"Loading"}>
          {currentView === "settings" && <Settings />}
        </Suspense>
      </div>
    </aside>
  );
};
