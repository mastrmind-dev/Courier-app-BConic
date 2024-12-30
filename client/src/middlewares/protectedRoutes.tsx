import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from '@/store/user';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const userState = useUserStore();
  const [cookies] = useCookies(['JwtToken']);

  const isUnAuthorized = () => {
    let isUnAuthorized = true;
    const JwtToken = cookies.JwtToken;

    if (userState.data != null && JwtToken != null) {
      isUnAuthorized = false;
    }

    return isUnAuthorized;
  };

  if (isUnAuthorized()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-white ">Please login to continue</h1>
        <button
          onClick={() => navigate('/login')}
          className="p-4 mt-10 text-lg font-semibold text-white bg-primary rounded-xl"
        >
          Sign up or log in
        </button>
      </div>
    );
  }

  return <Outlet />;
}
