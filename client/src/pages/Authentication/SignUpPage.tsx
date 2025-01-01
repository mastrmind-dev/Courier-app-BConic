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
import { signUpFormSchema } from '@/data_structures/schemas';
import MainLayout from '@/layouts/MainLayout';
import { signUpFormFields } from '@/data_structures/fields';
import { useRegister } from '@/hooks/api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import useUserStore from '@/store/user';
import { showResponseError } from '@/utils/errorUtils';
import { IError } from '@/data_structures/interfaces';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const { success, error } = useToast();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      address: '',
      contactNumber: '',
    },
  });

  const useRegisterMutation = useRegister();

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    console.log(values);
    setLoading(true);

    useRegisterMutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        success('User registered successfully');
        navigate('/login');
      },
      onError: (err) => {
        console.error('Error:', err);
        error(showResponseError(err as IError) || 'Registration failed');
        setLoading(false);
      },
    });
  };

  const userStore = useUserStore();

  return (
    <MainLayout>
      <div className="flex w-[100vw] my-[50px] items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-5 border rounded-lg shadow-2xl w-[400px] border-[#081470] border-2 fixed h-[75vh] overflow-y-scroll scrollbar-thin top-28"
          >
            <p className="font-bold text-[20px] text-[#081470] flex justify-center">Sign Up</p>
            <hr className="border-[#081470] w-[100px] m-auto" />
            {signUpFormFields.map((field) => (
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
                          type={
                            field.name === 'password' || field.name === 'confirmPassword'
                              ? 'password'
                              : 'text'
                          }
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            ))}
            <hr className="border-[#081470]" />
            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              onClick={() => {
                userStore.clearData();
              }}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
