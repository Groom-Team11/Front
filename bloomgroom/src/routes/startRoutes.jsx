import { Routes, Route } from 'react-router-dom';
import LoginPage from '../login';

// 시작 페이지 라우트
function StartRoutes() {
   return (
      <Routes>
         <Route path="/login" element={<LoginPage />} />
      </Routes>
   );
}

export default StartRoutes;