import { Routes, useLocation } from 'react-router-dom';
import appRoutes from './shared/routes';
import NavBar from './widgets/NavBar/NavBar';

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>{appRoutes}</Routes>
    </>
  );
}

export default App;
