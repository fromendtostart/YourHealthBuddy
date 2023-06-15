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
    console.log(auth.accessToken);
    const [planName, setPlanName] = useState<string>("");
    const [workouts, setWorkouts] = useState<string>("");

    const handleSubmit = async function(e : React.FormEvent){
        e.preventDefault();

        const workoutList : Array<string> = workouts.split(",");
        const numberedWorkoutList : Array<workoutObj> = workoutList.map((workout : string) => ({"workout" : workout, "number" : 0}))


        const planData = {
            "plan" : {
                "name" : planName,
                "plan" : {
                    "dates" : {
                        "start" : Date.now(),
                        "current" : Date.now()
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

        const createplanURL = "/add";
        try{
            const response = await axiosreq.post(createplanURL,
                    planData,
                    {
                        headers: {"Content-Type" : "application/json", "Authorization" : `Bearer ${auth.accessToken}`}
                    }
                );
                console.log(response);
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
                <form>
                    <label htmlFor="name">Plan Name</label>
                    <input 
                        type="text"
                        id="name"
                        required
                        value = {planName}
                        onChange={(e)=>setPlanName(e.target.value)}
                    />
                    <label htmlFor="workouts">Workouts</label>
                    <input 
                        type="text"
                        id="workouts"
                        required
                        value = {workouts}
                        onChange={(e)=>setWorkouts(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    ) : "";
}