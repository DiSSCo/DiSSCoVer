/* Import Dependencies */
import { BrowserRouter as Router, Routes } from 'react-router-dom';

/* Import Routes */
import AppRoutes from 'app/Routes';

/* Import Styles */
import './App.css';

/* Import Boot file */
import Boot from 'app/Boot';

/* Import Components */
import Loading from 'components/Loading';
import Notifications from 'components/elements/notifications/Notifications';
import Mobile from './Mobile';


/**
 * Function to render the application body and its routes
 * @returns JSX component
 */
const App = () => {
  /* Boot application */
  const { booted, isMobile } = Boot();

  /* If booted: return routes for application, otherwise show loading screen */
  if (booted && !isMobile) {
    return (
      <div className="h-100 w-100">
        <Router>
          <Routes>
            {AppRoutes}
          </Routes>
        </Router>

        <Notifications />
      </div>
    );
  } else if (isMobile) {
    return (
      <Mobile />
    );
  } else {
    return (
      <Loading />
    );
  }
};

export default App;