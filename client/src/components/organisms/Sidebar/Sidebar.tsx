import {
    AudioWaveform,
    PencilLine,
    Telescope
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Create Shipment',
    url: '#',
    icon: PencilLine,
  },
  {
    title: 'View Shipment',
    url: '#',
    icon: Telescope,
  },
  {
    title: 'Track Shipment',
    url: '#',
    icon: AudioWaveform,
  },
];

const AppSidebar = ({ setSelectedTab }: { setSelectedTab: (selectedTab: string) => void }) => {
  return (
    <Sidebar className="mt-[68px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      onClick={() => {
                        setSelectedTab(item.title.toLowerCase());
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
