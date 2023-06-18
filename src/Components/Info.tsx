import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import DailyGoals from "./DailyGoals";
import "./stylesheets/info.css"

interface workoutObj {
    workout : string,
    number : number
}

export default function Info(){

    const [rawResponse, setRawResponse] = useState<any[]>([]);
    const [responseData, setResponseData] = useState<Array<workoutObj>>([]);
    const [counter, setCounter] = useState(0);
    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/"
    })

    // const calculate = () => {
    //     for(let i=0; i<rawResponse.length; i++)
    //     {
    //         for(let j=0; j<rawResponse[i].plan.data.today.length; j++)
    //         {
    //             setResponseData((responseData)=> [...responseData, {workout : rawResponse[i].plan.data.today[j].workout, 
    //                                                 number : rawResponse[i].plan.data.today[j].number}]);
    //         }
    //     }
    // }

    const {auth} = useContext<any>(AuthContext);

    const fetchURL = "/data/fetchplans"

    //by fetching data from API, React component impure,  useEffect safe place to write impure code.

    //useffect doesn't expects promise so no async function, so gotta wrap in other function
    useEffect(()=>{
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
                            for(let j=0; j<rawResponse[0]?.plan?.data?.today?.length; j++)
                            {
                                setResponseData((responseData)=> [...responseData, {workout : rawResponse[0].plan.data.today[j].workout, 
                                                                    number : rawResponse[0].plan.data.today[j].number}]);
                            }
                        // }
                    
                    setCounter(1);
                    //can use useref instead of usestate as no re rendering shenanigans
            }catch(err){
                alert("Some problem!")
                console.log(err);
            }
            
        }
        fetchData();
    },[counter])
    //infinite loop on passing array as dependecy as recat checks in shallow way and refernce to array changes on each render, so better use useref
    //same with object, so use useMemo

    return(
        <div className="info" id = "info">
            {responseData && <DailyGoals workouts={responseData}/>}
            
        </div>
    )
}