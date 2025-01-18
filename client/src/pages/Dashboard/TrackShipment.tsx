import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRACKING_STATUS } from '@/data_structures/enums';
import { IError, IShipmentHistory } from '@/data_structures/interfaces';
import { useGetShipmentHistory, useTrackShipment } from '@/hooks/api/shipment';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { showResponseError } from '@/utils/errorUtils';
import { useState } from 'react';

const TrackShipment = () => {
  const [trackingStatus, setTrackingStatus] = useState<TRACKING_STATUS | ''>('');
  const [shipmentId, setShipmentId] = useState<string>('');
  const [shipmentHistory, setShipmentHistory] = useState<IShipmentHistory[]>([]);

  const useTrackShipmentMutation = useTrackShipment();
  const useGetShipmentHistoryMutation = useGetShipmentHistory();

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

    useGetShipmentHistoryMutation.mutateAsync(shipmentId, {
      onSuccess: (data) => {
        console.log('Shipment History:', data.data.data.shipment);
        setShipmentHistory(data.data.data.shipment);
      },
      onError: (err) => {
        console.log('History Error:', err);
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
        Current Status:{' '}
        <span className="font-bold">
          {trackingStatus || 'Search with a track no and track status will appear here'}
        </span>{' '}
      </p>

      <hr className="mt-5 ml-7 border" />

      <div className="ml-[30px] mt-5">
        <p>
          <span className="font-bold text-[18px] text-[#081470]">Shipment History</span> <br />
          current status / current or future location / deliveryman / date and time
        </p>
        {shipmentHistory.map((history, index) => {
          return (
            <div
              className="flex gap-x-2 border border-2 border-[blue] p-2 rounded-lg mt-5"
              key={history.id}
            >
              {index === 0 ? <div>⦿</div> : <div>▲</div>}
              <div className="font-bold">{history.status}</div>{' '}
              {history.status === 'NEAREST CENTER' ? 'at' : 'to'}
              <div className="font-bold">{history.metadata.location}</div> by
              <div className="font-bold">{history.metadata.deliveryMan}</div> on
              <div className="font-bold">{new Date(history.createdAt).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackShipment;
