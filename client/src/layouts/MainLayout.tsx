import Footer from '@/components/organisms/Footer/Footer';
import Navbar from '@/components/organisms/Navbar/Navbar';

const MainLayout = ({
  children,
  showFooter,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <header className="">
        <div className="flex items-center h-16 px-4">
          <Navbar />
        </div>
      </header>
      <main className="flex-1 space-y-4 ">{children}</main>{' '}
      <footer className={`fixed bottom-0 w-full z-[99] ${showFooter ?? 'hidden'}`}>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
