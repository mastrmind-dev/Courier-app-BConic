import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createShipmentFormSchema } from '@/data_structures/schemas';
import { createShipmentFormFields } from '@/data_structures/fields';
import { useCreateShipment, useGetShipmentsByUserId } from '@/hooks/api/shipment';
import { useState } from 'react';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { showResponseError } from '@/utils/errorUtils';
import { IError } from '@/data_structures/interfaces';

const CreateShipment = () => {
  const [loading, setLoading] = useState(false);

  const { refetch } = useGetShipmentsByUserId();

  const form = useForm<z.infer<typeof createShipmentFormSchema>>({
    resolver: zodResolver(createShipmentFormSchema),
    defaultValues: {
      recipientName: '',
      recipientContactNumber: '',
      recipientAddress: '',
      recipientEmail: '',
      weight: '',
      serviceType: 'economy',
      goodType: 'fragile',
      packagingType: 'box',
      paymentMethod: 'cash on delivery',
    },
  });

  const useCreateShipmentMutation = useCreateShipment();

  const { success, error } = useToast();

  function onSubmit(values: z.infer<typeof createShipmentFormSchema>) {
    console.log(values);
    setLoading(true);

    useCreateShipmentMutation.mutate(
      { ...values, weight: parseFloat(values.weight) },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
          success('Shipment created successfully');
        },
        onError: (err) => {
          console.error('Error:', err);
          error(showResponseError(err as IError) || 'Shipment creation failed');
          setLoading(false);
        },
      }
    );
  }

  return (
    <div className="flex flex-col w-full my-[20px] ml-[10px] justify-center">
      <p className="font-bold text-[20px] ml-[20px] text-[#081470]">Create Shipment</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-5 p-5 w-full flex flex-wrap">
            {createShipmentFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {(() => {
                        if (field.inputType === 'input') {
                          return (
                            <Input
                              placeholder={field.placeholder}
                              {...formField}
                              type={field.name === 'weight' ? 'number' : 'text'}
                            />
                          );
                        } else {
                          return (
                            <Select onValueChange={formField.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.inputValues?.map((value) => {
                                  return (
                                    <SelectItem value={value.toLowerCase()} key={value}>
                                      {value}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          );
                        }
                      })()}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button type="submit" className="w-[300px] mt-[20px] ml-[20px]" isLoading={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShipment;
