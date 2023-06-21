import { useState, useContext } from "react";
import "./stylesheets/planpopup.css"
import AuthContext from "../context/AuthProvider";
import axios from "axios"

interface Popup {
    trigger : boolean,
    setTrigger : (params : boolean) => void,
    //isestate returned function returns nothign
    children : any
}

interface workoutObj {
    "workout" : string,
    "number" : number
}


export default function Planpopup(props : Popup){

    const {auth} = useContext<any>(AuthContext);
    const [planName, setPlanName] = useState<string>("");
    const [workouts, setWorkouts] = useState<string>("");

    const handleSubmit = async function(e : React.FormEvent){
        e.preventDefault();

        const workoutList : Array<string> = workouts.split(",");
        const numberedWorkoutList : Array<workoutObj> = workoutList.map((workout : string) => ({"workout" : workout, "number" : 0}))
        console.log(`${auth.accessToken} is token`);

        const planData = {
            "plan" : {
                "name" : planName,
                "plan" : {
                    "dates" : {
                        "start" : new Date(),
                        "current" : new Date()
                    },
                    "data" : {
                        "today" : numberedWorkoutList,
                        "sum" : numberedWorkoutList
                    }
                }
            }

        }
        const axiosreq = axios.create({
            baseURL : "http://localhost:5000/data"
        })

        const createplanURL = "/addPlan";
        try{
            await axiosreq.post(createplanURL,
                    planData,
                    {
                        headers: {"Content-Type" : "application/json", "Authorization" : `Bearer ${auth.accessToken}`}
                    }
                );
        }catch(err : unknown){
            if(!(err as any)?.response){
                alert("No response from server");
            } else if ((err as any).response?.status === 409){
                alert("Username taken");
            } else {
                    alert("Registration failed")
                }
            }
    }

    return(props.trigger) ? (
        <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                <form className="popup-form">
                    <label htmlFor="name">Plan Name</label>
                    <input 
                        type="text"
                        id="name"
                        required
                        value = {planName}
                        onChange={(e)=>setPlanName(e.target.value)}
                    />
                    <label htmlFor="workouts">Workouts</label>
                    <span>Enter a comma seperated list</span>
                    <input 
                        type="text"
                        id="workouts"
                        required
                        placeholder="Ex - Squats, Curls"
                        value = {workouts}
                        onChange={(e)=>setWorkouts(e.target.value)}
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    ) : "";
}