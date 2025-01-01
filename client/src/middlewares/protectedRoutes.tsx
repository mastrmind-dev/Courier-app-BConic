import { useToast } from '@/providers/ToastProvider/ToastProvider';
import useUserStore from '@/store/user';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const userState = useUserStore();
  const { error } = useToast();

  const [isUnAuthorized, setIsUnAuthorized] = useState(false);

  useEffect(() => {
    if (!userState.id) {
      setIsUnAuthorized(true);
    }

    if (isUnAuthorized) {
      error('Please login first');
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnAuthorized]);

  return <Outlet />;
};

export default ProtectedRoute;
