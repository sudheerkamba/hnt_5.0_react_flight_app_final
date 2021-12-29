import Button from "@restart/ui/esm/Button"
import { useNavigate } from "react-router"

export const Logout=()=>{
    const nav=useNavigate();
    const onLogout=(e)=>{
nav('/');
    }
    return(
        <div className="tabs">
<ol className="tab-list"></ol>

<Button className="btn btn-outline-light" onClick={(e)=>{onLogout(e) }}>Logout</Button>
        </div>
    )
}