import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import DailyGoals from "./DailyGoals";
import "./stylesheets/info.css"

interface workoutObj {
    workout : string,
    number : number
}

export default function Info(){

    const {auth} = useContext<any>(AuthContext);

    const demoWorkouts = [{
        workout : "Push-ups",
        number : 10
    },
    {
        workout : "Squats",
        number : 12
    }]

    const [rawResponse, setRawResponse] = useState<any[]>([]);
    const [responseData, setResponseData] = useState<Array<workoutObj>>([]);
    const [sumData, setSumData] = useState<Array<workoutObj>>([]);
    const [fetched, setFetched] = useState<number>(0);

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/"
    })

    const fetchURL = "/data/fetchplans"

    const cleanedResponse = () => {
        const dateObj : Date = new Date();         
        const currPlan = rawResponse?.length-1;
        for(let j=0; j<rawResponse[currPlan]?.plan?.data?.today?.length; j++){  
            setResponseData((responseData)=> {
                if(dateObj.toISOString().substring(0,10)===rawResponse[currPlan].plan.dates.current?.substring(0, 10)){
                    return ([...responseData, {workout : rawResponse[currPlan].plan.data.today[j].workout, 
                        number : rawResponse[currPlan].plan.data.today[j].number}])
                }
                else{
                    return([...responseData, {workout : rawResponse[currPlan].plan.data.today[j].workout, 
                        number : 0}])
                }
            });

            setSumData((sumData)=>{
                if(dateObj.toISOString().substring(0,10)===rawResponse[currPlan].plan.dates.current?.substring(0, 10)){
                    return ([...sumData, {workout : rawResponse[currPlan].plan.data.sum[j].workout, 
                        number : rawResponse[currPlan].plan.data.sum[j].number}])
                }
                else{
                    return([...sumData, {workout : rawResponse[currPlan].plan.data.sum[j].workout, 
                        number : rawResponse[currPlan].plan.data.sum[j].number+rawResponse[currPlan].plan.data.today[j].number}])
                }
            });
        }
    }

    useEffect(() => {
        if (rawResponse.length > 0) {
            cleanedResponse();
        }
        }, [rawResponse]);
        
    const fetchData = async () => {
    try{
        const response = await axiosreq.get(fetchURL,
            {
                headers: {"Content-Type" : "application/json", "Authorization" : `Bearer ${auth.accessToken}`}
            }
        );
        setRawResponse(response.data[0].plans);   
        console.log(response);
        setFetched(1);
    }
    catch(err){
        if(!(err as any)?.response){
            alert("No response from server");
        } else if ((err as any).response?.status === 401){
            alert("Not logged in");
        } else {
                alert("Can't load right now")
            }
    }
    
    }

    const handleFetchGoals = () => {fetchData();}
    

    if(auth?.accessToken?.length>0){
        return(
            <div className="info" id = "info">
                <DailyGoals workouts={responseData} planName={rawResponse[rawResponse?.length-1]?.name} sum = {sumData}/>
                {!fetched?<button className="submit-btn" onClick={handleFetchGoals}>Fetch Goals</button>:""}
            </div>
        )
    }
    else{
        return(
            <div className="info" id = "info">
            {responseData && <DailyGoals workouts={demoWorkouts} planName={rawResponse[0]?.name} sum = {sumData}/>}
            <div className="demo-notice">
                <div className="demo">
                    This is just a demo, in order to be able track your own plan please register/login.
                </div>
                <div className="demo-btns">
                    <Link to="/YourHealthBuddy/register"><button className="submit-btn">Register</button></Link>
                    <Link to="/YourHealthBuddy/login"><button className="submit-btn">Login</button></Link>
                </div>
                </div>
            </div>
        )
    }
    
}