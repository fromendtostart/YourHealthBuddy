import Info from "./Info";
import Insights from "./Insights";
import Navbar from "./Navbar";
import "./stylesheets/dashboard.css"

export default function Dashboard(){
    return(
        <>
            <Navbar />
            <div className="info-section">
                <Info />
                <Insights />
            </div>
        </>
    )
}