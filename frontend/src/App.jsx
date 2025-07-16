import { Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
