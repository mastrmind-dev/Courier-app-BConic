import { socialMedia, VestaLogo } from '@/constants';

const Footer = () => {
  return (
    <div className="w-full flex flex-col border">
      <hr />
      <div className="flex items-center text-fade-white max-sm:flex-col max-sm:items-center ">
        <a href="/">
          <img src={VestaLogo} alt="logo" width={50} height={50} className="m-0" />
        </a>
        {socialMedia.map((icon) => (
          <div className="flex items-center gap-3" key={icon.alt}>
            <div className="flex flex-row items-center justify-center ">
              <img src={icon.src} alt={icon.alt} width={24} height={24} />
            </div>
          </div>
        ))}
        <div className="flex justify-center flex-1 gap-2 py-4 cursor-pointer font-montserrat text-[#999999]">
          <p>© 2024 Courier. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
