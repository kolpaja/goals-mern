import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import AppLayout from './components/AppLayout';



function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
