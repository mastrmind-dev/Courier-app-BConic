import { CourierLogo } from '@/constants';

const Logo = () => (
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <img src={CourierLogo} className="h-8 w-50" alt="Courier Logo" />
  </a>
);

export default Logo;
