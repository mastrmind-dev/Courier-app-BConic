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
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const formFields: {
    name: 'email' | 'password';
    placeholder: string;
    label: string;
    type: string;
  }[] = [
    {
      name: 'email',
      placeholder: 'Email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      placeholder: 'Password',
      label: 'Password',
      type: 'password',
    },
  ];

  return (
    <MainLayout>
      <div className="flex w-[100vw] my-[50px] items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-5 border rounded-lg shadow-2xl w-[400px] border-[#081470] border-2"
          >
            <p className="font-bold text-[20px] flex justify-center text-[#081470]">Login</p>
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

export default LoginPage;
