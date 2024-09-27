import { Route, Routes } from 'react-router-dom';
import ChatPage from '../container/chatPage';
import Overview from '../container/Overview';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/dashboard" element={<Overview />} />
    </Routes>
  );
};

export default PrivateRoutes;
