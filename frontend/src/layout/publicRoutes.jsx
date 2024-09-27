import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from '../container/login';
import PrivateRoutes from './privateRoutes';
import Demo from '../container/demo';

const PublicLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default PublicLayout;
