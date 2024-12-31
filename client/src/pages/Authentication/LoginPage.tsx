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
import { loginFormFields } from '@/data_structures/objects';
import { loginFormSchema } from '@/data_structures/schemas';
import { useState } from 'react';
import { useLogin } from '@/hooks/api/auth';
import { useToast } from '@/providers/ToastProvider';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const useLoginMutation = useLogin();

  const { success, error } = useToast();

  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    setLoading(true);

    useLoginMutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        success('Loged in successfully');
        navigate('/dashboard');
      },
      onError: (err) => {
        console.error('Error:', err);
        error('Login failed');
        setLoading(false);
      },
    });
  }

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
            {loginFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <div>
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={field.placeholder}
                          {...formField}
                          type={field.name === 'password' ? 'password' : 'text'}
                        />
                      </FormControl>
                      {/* <FormDescription>This is your public display name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            ))}
            <hr className="border-[#081470]" />
            <Button type="submit" className="w-full" isLoading={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
