import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function TrackShipment() {
  return (
    <div className="my-[20px]">
      <p className="font-bold text-[20px] ml-[30px] mb-[12px] text-[#081470]">Track Shipment</p>
      <div className="flex space-x-5 items-center ml-[22px] p-2">
        <Label className="w-[110px]">Track No</Label>
        <Input className="p-2" placeholder="Enter track no" />
        <Button>Track</Button>
      </div>
      <p className="ml-[30px] mt-2">
        Track Status: <span className='font-bold'>Delivered</span>{' '}
      </p>
    </div>
  );
}

export default TrackShipment;
