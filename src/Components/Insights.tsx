import axios from "axios";
import "./stylesheets/insights.css";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";

export default function Insights(){

    const demoInsights = [
        "Your best workout is \"Push ups\"",
        "Your worst workout is \"Curls\""
    ]

    const [insights, setInsights] = useState<string[]>(demoInsights);
    const [fetched, setFetched] = useState<number>(0);

    const {auth} = useContext<any>(AuthContext);

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/"
    })

    const fetchURL = "/data/fetchinsights"

    const fetchInsights = async ()=> {
        try{
            const response = await axiosreq.get(fetchURL,
                {
                    headers: {"Content-Type" : "application/json", "Authorization" : `Bearer ${auth.accessToken}`}
                }
            );
            setFetched(1);
            const responseInsights = response?.data;
            setInsights(responseInsights);
            console.log(responseInsights);
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

    if(auth?.accessToken?.length>0){
        return(
            <div className="insight">
            <div className="h-seperator"><hr/></div>
            <div className="insight-heading">Insights</div>
            {fetched?insights.map((item, index)=>{
                return(
                    <div className="insight-items" key={item}>Your {index===0?"best":"worst"} workout is {item}.</div>
                )
            }):""}
            {fetched===0?<div className="submit-btn" onClick={fetchInsights}>Fetch Insights</div>:""}
            </div>
        )
    }
    else{
        return(
            <div className="insights">
            <div className="h-seperator"><hr/></div>
            <div className="insight-heading">Insights</div>
            {demoInsights.map((item)=>{
                return(
                    <div className="insight-items" key={item}>{item}</div>
                )
            })}
            
        </div>
        )
    }

}