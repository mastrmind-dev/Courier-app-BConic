import { IError } from '@/data_structures/interfaces';
import { useLogout } from '@/hooks/api/auth';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import useUserStore from '@/store/user';
import { showResponseError } from '@/utils/errorUtils';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
  const userStore = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { success, error } = useToast();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const useLogoutMutation = useLogout();

  const handleLogout = () => {
    setIsLoading(true);

    useLogoutMutation.mutate(undefined, {
      onSuccess: () => {
        userStore.clearData();
        success('Logged out successfully');
        setIsLoading(false);

        if (window.location.pathname === '/') {
          window.location.reload();
        } else {
          navigate('/');
        }
      },
      onError: (err) => {
        console.error('Error:', err);
        error(showResponseError(err as IError) || 'Logout failed');
        setIsLoading(false);
      },
    });
  };

  return (
    <div ref={dropdownRef}>
      <div className="relative inline-block text-left">
        <div
          className="flex items-center gap-2 font-bold text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{userStore.firstName}</p>
          <img
            src={`https://gravatar.com/avatar/${userStore.id.replace(/-/g, '')}?s=400&d=robohash&r=x`}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border-2"
          />
        </div>
        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-[150px]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="p1" role="none">
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-t-md"
                role="menuitem"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:text-red-500 hover:bg-gray-100 bg-red-500 text-white rounded-b-md"
                role="menuitem"
                onClick={handleLogout}
              >
                {isLoading ? 'Loggin out...' : 'Logout'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserButton;
