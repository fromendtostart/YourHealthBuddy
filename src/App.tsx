import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import {Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout";

export default function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path = "/" element={<Dashboard />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

