// src/pages/HomePage.tsx
// This is the main landing page of the application.

import Footer from '@/components/organisms/Footer/Footer';
import MainLayout from '@/layouts/MainLayout';
// import { useLoginSuccess } from '@/services/auth.service';
// import LandingPage from './Components/LandingPage';

const HomePage = () => {
  //   const useLoginSuccessMutation = useLoginSuccess();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const isLoginSuccess = urlParams.get('success');

  //     if (isLoginSuccess === 'true') {
  //       useLoginSuccessMutation.mutate(undefined, {
  //         onSuccess: (data) => {
  //           console.log(data);
  //           if (data.data.data.profile.status === 'PENDING') {
  //             localStorage.setItem('email', data.data.data.profile.email);
  //             localStorage.setItem('jwt', data.data.data.token);
  //             navigate('/profile');
  //           } else if (
  //             data.data.data.profile.twoFactorAuthentication === true &&
  //             data.data.data.profile.status === 'APPROVED'
  //           ) {
  //             localStorage.setItem('email', data.data.data.profile.email);
  //             localStorage.setItem('jwt', data.data.data.token);
  //             navigate('/google-authentication?login=true');
  //           }
  //         },
  //         onError: (error) => {
  //           console.log(error);
  //         },
  //       });
  //     }
  //   }, []);

  return (
    <>
      <MainLayout>
        <div className="w-full">
          <div
            className="absolute bg-cover bg-center h-full w-full"
            style={{
              backgroundImage: "url('/assets/images/Background.jpg')",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h1 className="text-[white] border p-2  rounded-lg text-3xl font-bold">
                Your Best Ever Courier Partner
              </h1>
            </div>
          </div>
        </div>
        <footer className="fixed bottom-0 w-full z-[99]">
          <Footer />
        </footer>
      </MainLayout>
    </>
  );
};

export default HomePage;
