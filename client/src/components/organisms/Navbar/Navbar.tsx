// components/Navbar.tsx
import Logo from '@/components/organisms/Logo';
import MenuButton from '@/components/organisms/Navbar/MenuButton';
// import {
//   ActivityIcon,
//   AnalyticsIcon,
//   BrowsNFTIcon,
//   CareerIcon,
//   CollectionIcon,
//   DashboardIcon,
//   LearnMoreIcon,
//   NewsIcon,
//   RampIcon,
//   RankingIcon,
//   SwapIcon,
// } from '@/constants';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userState = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="bg-gradient-to-r from-sky-500 via-blue-500 to-green-500 fixed w-full z-20 top-0 start-0">
      <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Logo />
        <div className="flex gap-2 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {isLogin && <UserButton />}
        </div>
        <div className="flex justify-between w-full" id="navbar-sticky">
          {/* <NavItems navComponents={navComponents} /> */}
          <div className="w-1/2 flex gap-x-5 ml-5">
            <Button
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Button>
            <Button>About Us</Button>
            <Button>Contact Us</Button>
          </div>
          <div className={`w-1/4 flex justify-end gap-x-5 ${isLogin && 'hidden'}`}>
            <Button
              onClick={() => {
                navigate('/sign-up');
              }}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
