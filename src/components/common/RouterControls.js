import { Routes, Route } from "react-router-dom"
import AdminHome from "../../Admin/AdminHome"
import AdminLogin from "../../Admin/AdminLogin"
import HomePage from "../../HomePage"

function RouterControls() {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AdminLog" element={<AdminLogin />} />
            <Route path="/AdminHome" element={<AdminHome/>}/>

        </Routes>
    )

}

export default RouterControls