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

const formSchema = z.object({
  recipient_name: z
    .string()
    .min(2, {
      message: 'Recipient name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Recipient name must be less than 50 characters',
    }),
  recipient_contact_number: z.string().max(20, {
    message: 'Contact number must be less than 20 characters',
  }),
  recipient_address: z
    .string()
    .min(6, {
      message: 'Address must be at least 6 characters.',
    })
    .max(100, {
      message: 'Address must be less than 100 characters',
    }),
  recipient_email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  service_type: z.enum(['standard', 'express', 'economy'], {
    required_error: 'Please select a service type',
    invalid_type_error: 'Service type must be standard, express, or economy',
  }),
  good_type: z.enum(['fragile', 'electronic', 'perishable', 'flammable'], {
    required_error: 'Please select a good type',
    invalid_type_error: 'Good type must be fragile, electronic, perishable, or flammable',
  }),
  packaging_type: z.enum(['box', 'envelop'], {
    required_error: 'Please select a packaging type',
    invalid_type_error: 'Packaging type must be box or envelop',
  }),
  weight: z.number().max(10, {
    message: 'Weight must be less than 10 kg',
  }),
  payment_method: z.enum(['cash_on_delivery', 'credit_card', 'online'], {
    required_error: 'Please select a payment method',
    invalid_type_error: 'Payment method must be cash on delivery, credit card, or online',
  }),
});

const CreateShipment = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const formFields: {
    name: keyof z.infer<typeof formSchema>;
    placeholder: string;
    label: string;
    inputType: string;
    inputValues?: string[];
  }[] = [
    {
      name: 'recipient_name',
      placeholder: 'Enter recipient name',
      label: 'Recipient Name',
      inputType: 'input',
    },
    {
      name: 'recipient_contact_number',
      placeholder: 'Enter contact number',
      label: 'Contact Number',
      inputType: 'input',
    },
    {
      name: 'recipient_address',
      placeholder: 'Enter address',
      label: 'Address',
      inputType: 'input',
    },
    {
      name: 'recipient_email',
      placeholder: 'Enter email address',
      label: 'Email',
      inputType: 'input',
    },
    {
      name: 'weight',
      placeholder: 'Enter weight in kg',
      label: 'Weight (kg)',
      inputType: 'input',
    },
    {
      name: 'service_type',
      placeholder: 'Select service type',
      label: 'Service Type',
      inputType: 'dropdown',
      inputValues: ['Standard', 'Express', 'Economy'],
    },
    {
      name: 'good_type',
      placeholder: 'Select good type',
      label: 'Good Type',
      inputType: 'dropdown',
      inputValues: ['Fragile', 'Electronic', 'Perishable', 'Flammable'],
    },
    {
      name: 'packaging_type',
      placeholder: 'Select packaging type',
      label: 'Packaging Type',
      inputType: 'dropdown',
      inputValues: ['Box', 'Envelop'],
    },
    {
      name: 'payment_method',
      placeholder: 'Select payment method',
      label: 'Payment Method',
      inputType: 'dropdown',
      inputValues: ['Cash on delivery', 'Credit card', 'Online'],
    },
  ];

  return (
    <div className="flex flex-col w-full my-[20px] ml-[10px] justify-center">
      <p className="font-bold text-[20px] ml-[20px] text-[#081470]">Create Shipment</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="gap-5 p-5 w-full flex flex-wrap">
            {formFields.map((field) => (
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
                          return <Input placeholder={field.placeholder} {...formField} />;
                        } else {
                          return (
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.inputValues?.map((value) => {
                                  return <SelectItem value={value}>{value}</SelectItem>;
                                })}
                              </SelectContent>
                            </Select>
                          );
                        }
                      })()}
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button type="submit" className="w-[300px] mt-[20px] ml-[20px]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShipment;
