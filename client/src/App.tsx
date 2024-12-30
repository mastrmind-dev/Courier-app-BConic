import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/ui/spinner';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load pages to improve performance by splitting the bundle
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/Authentication/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Authentication/SignUpPage'));
const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardPage'));

const App = () => {
  return (
    <BrowserRouter>
      {/* Suspense component is used to show a fallback spinner while pages are being lazy loaded */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <Spinner />
          </div>
        }
      >
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          {/* ProtectedRoute component ensures that these routes are only accessible to authenticated users */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* </Route> */}

          {/* Fallback Route */}
          {/* If no other routes match, the NotFoundPage component is displayed */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;