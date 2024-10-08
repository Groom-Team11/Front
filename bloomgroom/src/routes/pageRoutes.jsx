import { Routes, Route } from 'react-router-dom';
import MainPage from '../main';
import DetailPage from '../detail';
import Flower from '../common/flower';
import CalendarPage from '../CalendarPage/index';
import GoalPage from '../GoalPage/index';
import LoginPage from '../login/index';
function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route path="/main" element={<MainPage></MainPage>} />
            <Route path="/detail" element={<DetailPage></DetailPage>} />
            <Route path="/setgoal" element={<GoalPage></GoalPage>} />
            <Route path="/flower" element={<Flower></Flower>} />
            <Route path="/calendar" element={<CalendarPage></CalendarPage>} />
        </Routes>
    );
}

export default PageRoutes;