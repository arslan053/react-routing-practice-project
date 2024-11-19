import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import Events, { loader as EventsLoader } from './pages/Events';
import RootLayout from './pages/RootLayout';
import EventsDetailPage, {
  loader as EventLoader,
  action as eventDeleteAction
} from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import EventsNavigation from './components/EventsNavigation';
import EventsLayout from './pages/EventsLayout';
import ErrorPage from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm';


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
        {path: 'new', element: <NewEventPage />, action: manipulateEventAction},
        {
          path: ':eventId',
          id: 'event-detail',
          loader: EventLoader,
          children: [
            {index: true,  element: <EventsDetailPage />, action: eventDeleteAction},
            {path: 'edit', element: <EditEventPage />, action: manipulateEventAction},
          ]
        },
      ]},
    ]},

  ])

  return <RouterProvider router={router} />;
}

export default App;

