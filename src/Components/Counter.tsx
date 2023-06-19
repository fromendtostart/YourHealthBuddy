import "./stylesheets/counter.css"

interface Countprops {
    count : number,
    workoutName : string,
    onCountChange : (workoutName : string, newCount : number) => void
}

export default function Counter(counter : Countprops){
    
    //instead of having count state here, just lifted it up to parent as count has to change in form and
    //child can't modify state of parent, so here getting count and function to modify count both from parent
    
    const increment = () => {
        counter.onCountChange(counter.workoutName, counter.count+1)
    }

    const decrement = () => {
        counter.onCountChange(counter.workoutName, counter.count-1)
    }

    return(
        <div className="counter">
            <button onClick={decrement} style={{color : "red"}}>-</button>
            {counter.count}
            <button onClick={increment} style={{color: "green"}}>+</button>
        </div>
    )
}