import { Route, Routes } from "react-router-dom";
import Overview from "../container/dashboard";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Overview />} />
    </Routes>
  );
};

export default PrivateRoutes;
