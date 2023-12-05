import React from "react";
import Sidebar from "./components/sidebar";
import Chart from "./components/chart";
function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Chart />
      </div>
    </>
  );
}

export default App;
