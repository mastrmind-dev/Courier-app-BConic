import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/ui/spinner';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './middlewares/protectedRoutes';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/Authentication/LoginPage'));
const SignupPage = lazy(() => import('@/pages/Authentication/SignUpPage'));
const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardPage'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh] w-[100vw]">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
