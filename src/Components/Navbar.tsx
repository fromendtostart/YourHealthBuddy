import "../Components/stylesheets/navbar.css"
import "./Planpopup";
import Planpopup from "./Planpopup";
import { useState } from "react";

export default function Navbar(){
    const [trigger, setTrigger] = useState<boolean>(false);
    return(
        <div className="navbar">
            <h2>YourHealthBuddy</h2>
            <div className="nav-buttons">
                <button onClick={()=>setTrigger(true)}>Create plan</button>
                <button>Logout</button>
            </div>
            <Planpopup trigger = {trigger} setTrigger = {setTrigger}>
            </Planpopup>
        </div>
    )
}