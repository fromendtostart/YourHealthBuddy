import Counter from "./Counter"
import "./stylesheets/dailygoals.css"
import axios from "axios"
import { useState } from "react"

interface workoutObj {
    workout : string,
    number : number,
}

interface WorkoutProps {
    workouts : Array<workoutObj>,
}

export default function DailyGoals(workoutProps : WorkoutProps) {

    //made this as state so value can change after counter is clicked
    const [updatedProps, setUpdatedProps] = useState(workoutProps.workouts)


    //function to be passed to child, there are many children  "counters" so have to pass identifiers to them
    //so that I know whose value is changed. 
    //for future : can "this" keyword help in shotening the code? no need to check name identified this would know
    //which object to update in array of objects means to whcih object this "counter" child belongs to?
    const handleCountChange = (workoutName : string, newCount : number) => {
        
        let index :number ;

        for(let i=0; i<updatedProps.length; i++){
            if(updatedProps[i].workout===workoutName){
                index=i;
                break;
            }
        }
        setUpdatedProps((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                number : newCount
            }
            return newData;
            // simply doing operations and retuning manually cant use new syntax of wrapping in (), can't do operations if use that.
        })
    }

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/data"
    })

    const updateURL = "/update";

    // const submitData = {
    //     "plan" : 
    // }

    // {
    //     "plan" : {
    //         "name": "Botman",
    //         "plan": {
    //             "dates": {
    //                 "start": "12",
    //                 "current": "12"
    //             },
    //             "data": {
    //                 "today": [{"workout": "pushups", "number":30}, {"workout": "pullups", "number":40}],
    //                 "sum" : [{"workout": "pushups", "number":30}, {"workout": "pullups", "number":40}]
    //             }
    //         }
    //     }
    // }

    // try{
    //     response = await axiosreq.post(regURL,
    //             {name : user, email, password : pwd},
    //             {
    //                 headers: {"Content-Type" : "application/json"},
    //                 withCredentials: true,
    //             }
    //         );
    // }catch(err : unknown){
            
    //     }

    const handleSubmit = ()=>{
        console.log(updatedProps);
    }
    return(
        <div className="dailygoals">
            <span className="goalheading">Daily Goals</span>
            <div className="goalitems">
                {updatedProps.map((item) => (
                    <div className="goalitem">
                        {item.workout}
                        {/* name shouldn't be what prop object is named in parameter but what is within that prop, as we don't do "prop=" */}
                        <Counter count= {item.number} workoutName={item.workout} updatedWorkout={updatedProps} onCountChange={handleCountChange}/>
                    </div>
                ))}
            </div>
            <button className="submitbutton" onClick={handleSubmit}>Submit</button>
        </div>
    )
}