import { useContext, useState } from "react";
import useDidMountEffect from "../Hooks/useDidMountEffect"
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


    const {auth} = useContext<any>(AuthContext);

    const fetchURL = "/data/fetchplans"

    //by fetching data from API, React component impure,  useEffect safe place to write impure code.

    //useffect doesn't expects promise so no async function, so gotta wrap in other function
        
        useDidMountEffect(() => {
            const fetchData = async () => {
            try{
                    const response = await axiosreq.get(fetchURL,
                        {
                            headers: {"Content-Type" : "application/json", "Authorization" : `Bearer ${auth.accessToken}`}
                        }
                    );
                    setRawResponse(response.data[0].plans);   
                    console.log(response);                
                        // for(let i=0; i<rawResponse.length; i++)
                        // {
                            const dateObj : Date = new Date();                            
                            for(let j=0; j<rawResponse[0]?.plan?.data?.today?.length; j++)
                            {  
                                setResponseData((responseData)=> {
                                    if(dateObj.toISOString().substring(0,10)===rawResponse[0].plan.dates.current?.substring(0, 10))
                                    {
                                        return ([...responseData, {workout : rawResponse[0].plan.data.today[j].workout, 
                                            number : rawResponse[0].plan.data.today[j].number}])
                                    }
                                    else
                                    {
                                        return([...responseData, {workout : rawResponse[0].plan.data.today[j].workout, 
                                            number : 0}])
                                    }
                                });
                                setSumData((sumData)=> [...sumData, {workout : rawResponse[0].plan.data.sum[j].workout, 
                                                                     number : rawResponse[0].plan.data.sum[j].number}]);
                            }
                        // }
                    console.log(response);
                    console.log(responseData);
                    //can use useref instead of usestate as no re rendering shenanigans
            }catch(err){
                if(!(err as any)?.response){
                    alert("No response from server");
                } else if ((err as any).response?.status === 401){
                    alert("Not logged in");
                } else {
                        alert("Can't load right now")
                    }
            }
            
        }
        fetchData();
        }, [fetched])
    //infinite loop on passing array as dependecy as recat checks in shallow way and refernce to array changes on each render, so better use useref
    //same with object, so use useMemo

        if(auth?.accessToken?.length>0)
        {
            return(
                <div className="info" id = "info">
                    {fetched?<DailyGoals workouts={responseData} planName={rawResponse[0]?.name} sum = {sumData}/>:""}
                    {!fetched?<button className="submit-btn" onClick={()=> setFetched(1)}>Fetch Goals</button>:""}
                </div>
            )
        }
        else
        {
            return(
                <div className="info" id = "info">
                {responseData && <DailyGoals workouts={demoWorkouts} planName={rawResponse[0]?.name} sum = {sumData}/>}
                <div className="demo-notice">
                    <div className="demo">
                        This is just a demo, in order to be able track your own plan please register/login.
                    </div>
                    <div className="demo-btns">
                        <Link to="/register"><button className="submit-btn">Register</button></Link>
                        <Link to="/login"><button className="submit-btn">Login</button></Link>
                    </div>
                 </div>
                </div>
            )
        }
    
}