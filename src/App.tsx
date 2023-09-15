import "./App.css";
import { SnackbarWrapper } from "./components/Snackbar/SnackbarWrapper";
import { Playground } from "./components/Playground";
import { Sidebar } from "./components/Sidebar";

function App() {
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
