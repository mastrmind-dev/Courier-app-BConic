import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { ROLE, TRACKING_STATUS } from '@/data_structures/enums';
import { IError, IShipmentDetails, IUserNonSensitiveDetails } from '@/data_structures/interfaces';
import {
  useGetAllShipments,
  useGetShipmentsByUserId,
  useUpdateTrackingStatus,
} from '@/hooks/api/shipment';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import useUserStore from '@/store/user';
import { showResponseError } from '@/utils/errorUtils';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { useEffect, useState } from 'react';

const ViewShipment = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [trackingStatusToUpdate, setTrackingStatusToUpdate] = useState<
    Record<string, TRACKING_STATUS>
  >({});

  const {
    data: userShipments,
    isLoading: isUserShipmentsLoading,
    refetch: refetchUserShipments,
  } = useGetShipmentsByUserId();

  const {
    data: allShipments,
    isLoading: isAllShipmentsLoasding,
    refetch: refetchAllShipments,
  } = useGetAllShipments();

  const useUpdateTrackingStatusMutation = useUpdateTrackingStatus();

  const userStore = useUserStore();

  const { success, error } = useToast();

  useEffect(() => {
    if (userStore.role === ROLE.ADMIN) {
      refetchAllShipments();
    } else {
      refetchUserShipments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateTrackingStatus = (shipmentId: string) => {
    setIsLoading((prev) => ({ ...prev, [shipmentId]: true }));

    useUpdateTrackingStatusMutation.mutate(
      {
        trackingStatus: trackingStatusToUpdate[shipmentId],
        shipmentId: shipmentId,
      },
      {
        onSuccess: () => {
          setIsLoading((prev) => ({ ...prev, [shipmentId]: false }));

          if (userStore.role === ROLE.ADMIN) {
            refetchAllShipments();
          } else {
            refetchUserShipments();
          }

          success('Tracking status updated successfully');
        },
        onError: (err) => {
          setIsLoading((prev) => ({ ...prev, [shipmentId]: false }));
          error(showResponseError(err as IError) || 'Failed to update tracking status');
        },
      }
    );
  };

  const getShipmentDetails = () => {
    if (userStore.role === ROLE.USER) {
      return userShipments || [];
    } else {
      return allShipments || [];
    }
  };

  const getShipmentKeys = (key: string) => {
    if ('recipientEmail' === key) {
      return 'Recipient Email';
    } else if ('recipientName' === key) {
      return 'Recipient Name';
    } else if ('recipientContactNumber' === key) {
      return 'Recipient Contact Number';
    } else if ('recipientAddress' === key) {
      return 'Recipient Address';
    } else if ('goodType' === key) {
      return 'Good Type';
    } else if ('weight' === key) {
      return 'Weight (kg)';
    } else if ('serviceType' === key) {
      return 'Service Type';
    } else if ('paymentMethod' === key) {
      return 'Payment Method';
    } else if ('packagingType' === key) {
      return 'Packaging Type';
    }
    // sender's details
    else if ('name' === key) {
      return "Sender's Name";
    } else if ('email' === key) {
      return "Sender's Email";
    } else if ('contactNumber' === key) {
      return "Sender's Contact Number";
    } else {
      return key;
    }
  };

  const getTrackingStatusMessage = (trackingStatus: TRACKING_STATUS) => {
    return (
      (trackingStatus === TRACKING_STATUS.PENDING &&
        'Our package collectors on the way to your place to collect the package.') ||
      (trackingStatus === TRACKING_STATUS.RECIEVED &&
        'We have recieved your package and processing on the distribution.') ||
      (trackingStatus === TRACKING_STATUS.ON_THE_WAY &&
        'Your package is on the way to the destination.') ||
      (trackingStatus === TRACKING_STATUS.NEAREST_CENTER &&
        'Your package is at the nearest center to the destination and will be delivered after getting confirmation from the recipient') ||
      (trackingStatus === TRACKING_STATUS.DELIVERED && 'Your package has been delivered.')
    );
  };

  const TrackingStatusUpdateFrom = ({
    id,
    trackingStatus,
  }: {
    id: string;
    trackingStatus: string;
  }) => {
    return (
      <>
        <select
          className="w-full mt-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  p-1 shadow-sm"
          onChange={(e) => {
            setTrackingStatusToUpdate((prev) => ({
              ...prev,
              [id]: e.target.value as TRACKING_STATUS,
            }));
          }}
          defaultValue={trackingStatus}
          value={trackingStatusToUpdate[id]}
        >
          {Object.values(TRACKING_STATUS).map((status) => (
            <option key={status} value={status} className="text-black">
              {status}
            </option>
          ))}
        </select>
        <Button
          className="w-full"
          onClick={() => {
            handleUpdateTrackingStatus(id);
          }}
          isLoading={isLoading[id]}
        >
          Update
        </Button>
      </>
    );
  };

  return (
    <div className="my-[20px]">
      <p className="font-bold text-[20px] ml-[30px] mb-[30px] text-[#081470]">View Shipment</p>
      {isUserShipmentsLoading || isAllShipmentsLoasding ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-y-8">
          {getShipmentDetails().map((shipment: IShipmentDetails) => {
            const {
              id,
              trackingStatus,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              senderId,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              createdAt,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              updatedAt,
              ...otherDetails
            } = shipment;
            return (
              <Card
                className="w-[250px] h-[300px] ml-[30px] overflow-y-scroll scrollbar-thin shadow-inner bg-gray-100"
                key={id}
              >
                <CardHeader className="bg-[#081470] text-white sticky top-0 w-full">
                  <CardTitle>
                    Track No: <br />
                    <span className="font-[400] text-[15px]">{id}</span>
                  </CardTitle>
                  <CardDescription className="text-[#87CEEB]">
                    {capitalizeFirstLetter(shipment.goodType)}
                  </CardDescription>
                  <hr />
                </CardHeader>
                <CardContent>
                  <ul className="list-dic mt-4 space-y-2">
                    <li className="space-y-2">
                      <span className="font-bold">Track Status:</span> {trackingStatus}
                      {userStore.role === ROLE.ADMIN ? (
                        <TrackingStatusUpdateFrom id={id} trackingStatus={trackingStatus} />
                      ) : (
                        <p>{getTrackingStatusMessage(trackingStatus as TRACKING_STATUS)}</p>
                      )}
                    </li>

                    {Object.entries(otherDetails).map(([key, value]) => {
                      if (key === 'sender' && userStore.role === ROLE.ADMIN) {
                        const { firstName, lastName, email, contactNumber } =
                          value as IUserNonSensitiveDetails;
                        const selectedSenderDetails = {
                          name: `${firstName} ${lastName}`,
                          email,
                          contactNumber,
                        };

                        return Object.entries(selectedSenderDetails).map(([key, value]) => {
                          return (
                            <li key={key}>
                              <span className="font-bold">
                                {getShipmentKeys(key)}:<br />
                              </span>{' '}
                              {capitalizeFirstLetter(String(value))}
                            </li>
                          );
                        });
                      } else if (key === 'sender' && userStore.role === ROLE.USER) {
                        return null;
                      } else {
                        return (
                          <li key={key}>
                            <span className="font-bold">
                              {getShipmentKeys(key)}:<br />
                            </span>
                            {capitalizeFirstLetter(String(value))}
                          </li>
                        );
                      }
                    })}
                  </ul>{' '}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewShipment;
