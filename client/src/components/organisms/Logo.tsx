import { VestaLogo } from '@/constants';

const Logo = () => (
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <img src={VestaLogo} className="h-8 w-50" alt="Vesta Logo" />
  </a>
);

export default Logo;
