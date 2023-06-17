import {useState} from "react";
import "./stylesheets/counter.css"

interface workoutObj {
    workout : string,
    number : number,
}

interface Countprops {
    count : number,
    workoutName : string,
    updatedWorkout : Array<workoutObj>,
    onCountChange : (workoutName : string, newCount : number) => void
}

export default function Counter(counter : Countprops){
    
    //instead of having count state here, just lifted it up to parent as count has to change in form and
    //child can't modify state of parent, so here getting count and function to modify count both from parent
    
    const increment = () => {
        counter.onCountChange(counter.workoutName, counter.count+1)
    }

    const decrement = () => {
        counter.onCountChange(counter.workoutName, counter.count-1);
    }

    return(
        <div className="counter">
            <button onClick={decrement}>-</button>
            {counter.count}
            <button onClick={increment}>+</button>
        </div>
    )
}