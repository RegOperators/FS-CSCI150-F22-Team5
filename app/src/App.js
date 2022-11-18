import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import ScheduleGenerator from './pages/ScheduleGenerator'
import ScheduleGeneratorResults from './pages/ScheduleGeneratorResults'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: 'schedule-generator',
          element: <ScheduleGenerator />
        },
        {
          path: 'schedule-generator/results',
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
