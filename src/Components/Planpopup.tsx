import { ReactHTMLElement } from "react";
import "./stylesheets/planpopup.css"

interface Popup {
    trigger : boolean,
    setTrigger : (params : boolean) => void,
    //isestate returned function returns nothign
    children : any
}


export default function Planpopup(props : Popup){
return(props.trigger) ? (
        <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                
            </div>
        </div>
    ) : "";
}