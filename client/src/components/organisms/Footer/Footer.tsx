import { CourierLogo } from '@/constants';

const Footer = () => {
  return (
    <div className="w-full flex flex-col opacity-[0.4] bg-[white]">
      <div className="flex items-center text-fade-white max-sm:flex-col max-sm:items-center ">
        <a href="/">
          <img src={CourierLogo} alt="logo" width={50} height={50} className="ml-4" />
        </a>
        <div className="flex justify-center flex-1 gap-2 py-4 cursor-pointer font-montserrat text-[#999999] text-[black]">
          <p>© 2024 Courier. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
