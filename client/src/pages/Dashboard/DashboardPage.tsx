import AppSidebar from '@/components/organisms/Sidebar/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import CreateShipment from './CreateShipment';
import ViewShipment from './ViewShipment';
import TrackShipment from './TrackShipment';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('create shipment');

  console.log('selectedTab:::', selectedTab);

  return (
    <MainLayout>
      <div className="w-full">
        <SidebarProvider>
          <AppSidebar setSelectedTab={setSelectedTab} />
          <SidebarTrigger className="mt-[10px] ml-[7px] bg-[#eddbda] " />
          <div className={`${selectedTab !== 'create shipment' && 'hidden'} w-full`}>
            <CreateShipment />
          </div>
          <div
            className={`${selectedTab !== 'view shipment' && 'hidden'} w-full flex justify-center`}
          >
            <ViewShipment />
          </div>
          <div className={`${selectedTab !== 'track shipment' && 'hidden'}`}>
            <TrackShipment />
          </div>
        </SidebarProvider>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
