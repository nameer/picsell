import { Route, Routes } from 'react-router-dom';
import Dashboard from '../container/dashboard';
import ChatPage from '../container/chatPage';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
