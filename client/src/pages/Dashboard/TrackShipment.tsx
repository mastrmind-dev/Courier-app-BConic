import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRACKING_STATUS } from '@/data_structures/enums';
import { IError } from '@/data_structures/interfaces';
import { useTrackShipment } from '@/hooks/api/shipment';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { showResponseError } from '@/utils/errorUtils';
import { useState } from 'react';

const TrackShipment = () => {
  const [trackingStatus, setTrackingStatus] = useState<TRACKING_STATUS | ''>('');
  const [shipmentId, setShipmentId] = useState<string>('');

  const useTrackShipmentMutation = useTrackShipment();

  const { success, error } = useToast();

  const handleSubmit = async () => {
    useTrackShipmentMutation.mutateAsync(shipmentId, {
      onSuccess: (data: {
        data: { data: { trackingDetails: { shipmentId: string; trackingStatus: string } } };
      }) => {
        success('Shipment tracked successfully');
        setTrackingStatus(data.data.data.trackingDetails.trackingStatus as TRACKING_STATUS);
      },
      onError: (err) => {
        console.log('Track Error:', err);
        error(showResponseError(err as IError) || 'Failed to track shipment');
      },
    });
  };

  return (
    <div className="my-[20px]">
      <p className="font-bold text-[20px] ml-[30px] mb-[12px] text-[#081470]">Track Shipment</p>
      <div className="flex space-x-5 items-center ml-[22px] p-2">
        <Label className="w-[110px]">Track No</Label>
        <Input
          className="p-2"
          onChange={(e) => {
            setShipmentId(e.target.value);
          }}
          placeholder="Enter track no"
        />
        <Button onClick={handleSubmit}>Track</Button>
      </div>
      <p className="ml-[30px] mt-2">
        Track Status:{' '}
        <span className="font-bold">
          {trackingStatus || 'Search with a track no and track status will appear here'}
        </span>{' '}
      </p>
    </div>
  );
};

export default TrackShipment;
