import { Route, Routes } from "react-router-dom";
import Dashboard from "../container/dashboard";

const PrivateRoutes = () => {
    return (
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
    )
}

export default PrivateRoutes;