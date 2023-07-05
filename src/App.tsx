import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import {Routes, Route} from "react-router-dom";
import Layout from "./Components/Layout";

export default function App() {
  return (
    <>
      <Routes>
      <Route path="/YourHealthBuddy/" element={<Layout />}>
        <Route path = "/YourHealthBuddy/" element={<Dashboard />} />
        <Route path = "/YourHealthBuddy/login" element={<Login />} />
        <Route path = "/YourHealthBuddy/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

