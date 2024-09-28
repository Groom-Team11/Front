import { Routes, Route } from 'react-router-dom';
import MainPage from '../main';
import DetailPage from '../detail';
import SetGoalPage from '../setGoal';
function PageRoutes() {
   return (
      <Routes>
         <Route path="/main" element={<MainPage></MainPage>} />
         <Route path="/detail" element={<DetailPage></DetailPage>} />
         <Route path="/setgoal" element={<SetGoalPage></SetGoalPage>} />
      </Routes>
   );
}

export default PageRoutes;