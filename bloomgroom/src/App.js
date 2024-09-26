
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import StartRoutes from './routes/startRoutes';
import PageRoutes from './routes/pageRoutes';

function App() {
  return (
    <Router>
      <StartRoutes />
      <PageRoutes />
    </Router>
  );
}

export default App;
