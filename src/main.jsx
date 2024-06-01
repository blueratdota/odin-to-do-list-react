import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { StyledEngineProvider } from '@mui/material';
import './index.css'
import AllToDo from './pages/AllToDo.jsx';
import WeekToDo from './pages/WeekToDo.jsx';
import TodayToDo from './pages/TodayToDo.jsx';
import Projects from './pages/Projects.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        path: "pages/:pageId",
        // element: <Contact />,
        // loader: contactLoader,
      },
      { path: "all-to-do", element: <AllToDo /> },
      { path: "today-to-do", element: <TodayToDo /> },
      { path: "week-to-do", element: <WeekToDo /> },
      { path: "projects-to-do", element: <Projects /> }


    ]
  },


]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>,
)
