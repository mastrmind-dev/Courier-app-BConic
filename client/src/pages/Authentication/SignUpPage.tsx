import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MainLayout from '@/layouts/MainLayout';
import { SignUpFormFieldsType } from '@/data_structures/types';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .max(50, {
      message: 'Email must be less than 50 characters',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(20, {
      message: 'Password must be less than 20 characters',
    }),
  confirm_password: z
    .string()
    .min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    })
    .max(20, {
      message: 'Confirm Password must be less than 20 characters',
    }),
  first_name: z
    .string()
    .min(1, {
      message: 'First Name must be at least 1 character.',
    })
    .max(50, {
      message: 'First Name must be less than 50 characters',
    }),
  last_name: z
    .string()
    .min(1, {
      message: 'Last Name must be at least 1 character.',
    })
    .max(50, {
      message: 'Last Name must be less than 50 characters',
    }),
  address: z
    .string()
    .min(1, {
      message: 'Address must be at least 1 character.',
    })
    .max(100, {
      message: 'Address must be less than 100 characters',
    }),
  contact_number: z
    .string()
    .min(10, {
      message: 'Contact Number must be at least 10 characters.',
    })
    .max(15, {
      message: 'Contact Number must be less than 15 characters',
    }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const formFields: {
    name: SignUpFormFieldsType;
    placeholder: string;
    label: string;
  }[] = [
    {
      name: 'email',
      placeholder: 'Email',
      label: 'Email',
    },
    {
      name: 'password',
      placeholder: 'password',
      label: 'Password',
    },
    {
      name: 'confirm_password',
      placeholder: 'Confirm password',
      label: 'Confirm Password',
    },
    {
      name: 'first_name',
      placeholder: 'First name',
      label: 'First Name',
    },
    {
      name: 'last_name',
      placeholder: 'Last name',
      label: 'Last Name',
    },
    {
      name: 'address',
      placeholder: 'Address',
      label: 'Address',
    },
    {
      name: 'contact_number',
      placeholder: 'Contact number',
      label: 'Contact Number',
    },
  ];

  return (
    <MainLayout>
      <div className="flex w-full my-[50px] items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-5 border rounded-lg shadow-lg w-[400px] border-[#081470] border-2"
          >
            <p className="font-bold text-[20px] flex justify-center">Sign Up</p>
            <hr className="border-[#081470] w-[100px] m-auto" />
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <div>
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...formField} />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            ))}
            <hr className="border-[#081470]" />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
