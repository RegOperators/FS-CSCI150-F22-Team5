import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './pages/Home'
import ScheduleGenerator from './pages/ScheduleGenerator'
import ScheduleGeneratorResults from './pages/ScheduleGeneratorResults'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/schedule-generator/',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <ScheduleGenerator />
        },
        {
          path: 'results',
          element: <ScheduleGeneratorResults />
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
