import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';

/* ── Lazy-loaded screens (code-split per route) ─────────────── */

const Onboarding    = lazy(() => import('./screens/Onboarding').then(m => ({ default: m.Onboarding })));
const Home          = lazy(() => import('./screens/Home').then(m => ({ default: m.Home })));
const Topics        = lazy(() => import('./screens/Topics').then(m => ({ default: m.Topics })));
const TopicDetail   = lazy(() => import('./screens/TopicDetail').then(m => ({ default: m.TopicDetail })));
const Lesson        = lazy(() => import('./screens/Lesson').then(m => ({ default: m.Lesson })));
const EquationBank  = lazy(() => import('./screens/EquationBank').then(m => ({ default: m.EquationBank })));
const PastPaperMode = lazy(() => import('./screens/PastPaperMode').then(m => ({ default: m.PastPaperMode })));
const Settings      = lazy(() => import('./screens/Settings').then(m => ({ default: m.Settings })));
const Dashboard     = lazy(() => import('./screens/Dashboard').then(m => ({ default: m.Dashboard })));
const Achievements  = lazy(() => import('./screens/Achievements').then(m => ({ default: m.Achievements })));
const Review        = lazy(() => import('./screens/Review').then(m => ({ default: m.Review })));
const Search        = lazy(() => import('./screens/Search').then(m => ({ default: m.Search })));
const Practicals    = lazy(() => import('./screens/Practicals').then(m => ({ default: m.Practicals })));
const PracticalDetail = lazy(() => import('./screens/PracticalDetail').then(m => ({ default: m.PracticalDetail })));

/* ── Loading fallback ───────────────────────────────────────── */

function ScreenFallback() {
  return (
    <div
      role="status"
      aria-label="Loading screen"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: '60vh',
        color: 'var(--muted)',
        fontSize: '0.875rem',
      }}
    >
      <span>Loading…</span>
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<ScreenFallback />}>{element}</Suspense>;
}

/* ── Router ─────────────────────────────────────────────────── */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home',              element: withSuspense(<Home />)          },
      { path: 'search',            element: withSuspense(<Search />)        },
      { path: 'review',            element: withSuspense(<Review />)        },
      { path: 'topics',            element: withSuspense(<Topics />)        },
      { path: 'topic/:topicId',    element: withSuspense(<TopicDetail />)   },
      { path: 'equations',         element: withSuspense(<EquationBank />) },
      { path: 'papers',            element: withSuspense(<PastPaperMode />) },
      { path: 'settings',          element: withSuspense(<Settings />)      },
      { path: 'dashboard',         element: withSuspense(<Dashboard />)     },
      { path: 'achievements',      element: withSuspense(<Achievements />)  },
      { path: 'practicals',        element: withSuspense(<Practicals />)    },
      { path: 'practical/:id',     element: withSuspense(<PracticalDetail />) },
    ],
  },
  { path: '/onboarding', element: withSuspense(<Onboarding />) },
  { path: '/learn/:conceptId', element: withSuspense(<Lesson />) },
]);
