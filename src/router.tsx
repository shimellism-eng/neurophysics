import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { Topics } from './screens/Topics';
import { TopicDetail } from './screens/TopicDetail';
import { Lesson } from './screens/Lesson';
import { EquationBank } from './screens/EquationBank';
import { PastPaperMode } from './screens/PastPaperMode';
import { Settings } from './screens/Settings';
import { Dashboard } from './screens/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home',              element: <Home />          },
      { path: 'topics',            element: <Topics />        },
      { path: 'topic/:topicId',    element: <TopicDetail />   },
      { path: 'equations',         element: <EquationBank />  },
      { path: 'papers',            element: <PastPaperMode /> },
      { path: 'settings',          element: <Settings />      },
      { path: 'dashboard',         element: <Dashboard />     },
    ],
  },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/learn/:conceptId', element: <Lesson /> },
]);
