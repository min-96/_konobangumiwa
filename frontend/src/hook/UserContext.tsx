import React, { useEffect, useState } from 'react';
import { User } from '../types/movie';
import * as API from '../API/User';
import { useError } from './ErrorContext';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showError } = useError();

  useEffect(() => {
    async function fetchUser() {
      try {
        const fetchedUser = await API.getMyData(); // API 함수 호출
        setUser(fetchedUser);
      } catch (error: any) {
        showError('User Fetch Error', error.message); // 에러 처리
      }
    }
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};