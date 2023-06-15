import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import {Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<Dashboard />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
      </Routes>
    </>
  )
}

