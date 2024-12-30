import Navbar from '@/components/organisms/Navbar/Navbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <header className="">
        <div className="flex items-center h-16 px-4">
          <Navbar />
        </div>
      </header>
      <main className="flex-1 space-y-4 ">{children}</main>
    </div>
  );
};

export default MainLayout;
