import { Routes, Route } from 'react-router-dom';
import MainPage from '../main';
import DetailPage from '../detail';
import SetGoalPage from '../setGoal';
import Flower from '../common/flower';
import CalendarPage from '../CalendarPage/index';
function PageRoutes() {
   return (
      <Routes>
         <Route path="/main" element={<MainPage></MainPage>} />
         <Route path="/detail" element={<DetailPage></DetailPage>} />
         <Route path="/setgoal" element={<SetGoalPage></SetGoalPage>} />
         <Route path="/flower" element={<Flower></Flower>} />
         <Route path="/calendar" element={<CalendarPage></CalendarPage>} />
      </Routes>
   );
}

export default PageRoutes;