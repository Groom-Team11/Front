import { Routes, Route } from 'react-router-dom';
import MainPage from '../main';
function PageRoutes() {
   return (
      <Routes>
         <Route path="/main" element={<MainPage></MainPage>} />
      </Routes>
   );
}

export default PageRoutes;