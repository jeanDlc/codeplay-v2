import "./App.css";
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
    </>
  );
}

export default App;
