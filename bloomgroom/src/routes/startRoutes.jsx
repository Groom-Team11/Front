import { Routes, Route } from 'react-router-dom';
import LoginPage from '../login';
import KakaoRedirectHandler from '../login/KakaoRedirectHandler';

// 시작 페이지 라우트
function StartRoutes() {
   return (
      <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route path="/oauth2/callback/kakao" element={<KakaoRedirectHandler />} />
      </Routes>
   );
}

export default StartRoutes;