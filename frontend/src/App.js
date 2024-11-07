import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import Events, { loader as EventsLoader } from './pages/Events';
import RootLayout from './pages/RootLayout';
import EventsDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import EventsNavigation from './components/EventsNavigation';
import EventsLayout from './pages/EventsLayout';
import { loader } from './pages/Events';
import ErrorPage from './pages/Error';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<RootLayout />,
      errorElement: <ErrorPage />,
      children: [
      {index: true, element: <HomePage />},
      {path: '/events', element: <EventsLayout />, children: [
        {index: true, element: <Events />, loader: EventsLoader},
        {path: '/events/:eventId', element: <EventsDetailPage />},
        {path: '/events/new', element: <NewEventPage />},
        {path: '/events/:eventId/edit', element: <EditEventPage />},
      ]},
    ]},

  ])

  return <RouterProvider router={router} />;
}

export default App;

