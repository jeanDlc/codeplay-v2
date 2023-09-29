import "./App.css";
import { SnackbarWrapper } from "./components/Snackbar/SnackbarWrapper";
import { Playground } from "./components/Playground";
import { Sidebar } from "./components/Sidebar";
import { useEffect } from "react";
import { isDesktop } from "./utils/size";
import { useSnackbarStore } from "./store/useSnackbarStore";

function App() {
  const trigerSnackbar = useSnackbarStore(({ trigger }) => trigger);

  useEffect(() => {
    if (!isDesktop()) {
      trigerSnackbar({
        message: "This app looks better on a larger device",
        variation: "warning",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="app">
        <div className="layout">
          <Sidebar />
          <Playground />
        </div>
      </div>
      <SnackbarWrapper />
    </>
  );
}

export default App;
