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
import { loginFormFields } from '@/data_structures/fields';
import { IError, IUserNonSensitiveDetails } from '@/data_structures/interfaces';
import { loginFormSchema } from '@/data_structures/schemas';
import { Role } from '@/data_structures/types';
import { useLogin } from '@/hooks/api/auth';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import useUserStore from '@/store/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '@/data_structures/enums';
import { showResponseError } from '@/utils/errorUtils';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const userStore = useUserStore();

  const useLoginMutation = useLogin();

  const { success, error } = useToast();

  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    setLoading(true);

    useLoginMutation.mutate(values, {
      onSuccess: (data: { data: { data: { user: IUserNonSensitiveDetails } } }) => {
        const { id, firstName, lastName, email, role } = data.data.data.user;

        userStore.setId(id);
        userStore.setFirstName(firstName || '');
        userStore.setLastName(lastName || '');
        userStore.setRole((role as Role) || ROLE.USER);
        userStore.setEmail(email || '');

        setLoading(false);
        success('Loged in successfully');
        navigate('/dashboard');
      },
      onError: (err) => {
        console.error('Error:', err);
        error(showResponseError(err as IError) || 'Login failed');
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
