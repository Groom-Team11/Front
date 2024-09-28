
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import StartRoutes from './routes/startRoutes';
import PageRoutes from './routes/pageRoutes';
import Flower from '../common/flower';
import GoalPage from '../GoalPage/index';
import LoginPage from '../login/index';
function App() {
  return (
    <Router>
      <StartRoutes />
      <PageRoutes />
    </Router>
  );
}

export default App;