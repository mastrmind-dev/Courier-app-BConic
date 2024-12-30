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
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UserButton from './UserButton';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userState = useUserStore();
  const [cookies] = useCookies(['JwtToken']);
  const navigate = useNavigate();

  const isUnAuthorized = () => {
    const JwtToken = cookies.JwtToken;

    if (userState.data != null && JwtToken != null) {
      setIsLogin(true);
      return false;
    } else {
      setIsLogin(false);
      return true;
    }
  };

  useEffect(() => {
    isUnAuthorized();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const navComponents = [
  //   {
  //     id: '1',
  //     title: 'Stats',
  //     items: [
  //       {
  //         id: '1',
  //         item: 'Dashboard',
  //         route: '/dashboard',
  //         icon: DashboardIcon,
  //       },
  //       {
  //         id: '2',
  //         item: 'Analytics',
  //         route: '/analytics',
  //         icon: AnalyticsIcon,
  //       },
  //       { id: '3', item: 'Swap', route: '/swap', icon: SwapIcon },
  //       { id: '4', item: 'On /Off Ramp', route: '/ramp', icon: RampIcon },
  //       { id: '5', item: 'Rankings', route: '/rankings', icon: RankingIcon },
  //       { id: '6', item: 'Activity', route: '/activity', icon: ActivityIcon },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Marketplace',
  //     items: [
  //       {
  //         id: '1',
  //         item: 'Browse NFT',
  //         route: '/browse-nft',
  //         icon: BrowsNFTIcon,
  //       },
  //       {
  //         id: '2',
  //         item: 'Collection',
  //         route: '/collection',
  //         icon: CollectionIcon,
  //       },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'Launchpad',
  //     route: '/launchpad',
  //     items: [],
  //   },
  //   {
  //     id: '4',
  //     title: 'Community',
  //     items: [
  //       { id: '1', item: 'News', route: '/news', icon: NewsIcon },
  //       { id: '2', item: 'Career', route: '/career', icon: CareerIcon },
  //       {
  //         id: '3',
  //         item: 'Learn More',
  //         route: '/learn-more',
  //         icon: LearnMoreIcon,
  //       },
  //     ],
  //   },
  // ];

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
          <div className="w-1/4 flex justify-end gap-x-5">
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
