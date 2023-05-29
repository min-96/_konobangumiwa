import React, { useEffect, useState } from 'react';
import { Review, User } from '../types/movie';
import * as User_API from '../API/User';
import * as Review_API from '../API/Review';
import { useError } from './ErrorContext';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  myReviews: Review[];
  setMyReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const { showError } = useError();

  useEffect(() => {
    async function fetchUser() {
      try {
        const fetchedUser = await User_API.getMyData(); // API 함수 호출
        setUser(fetchedUser);
      } catch (error: any) {
        showError('User Fetch Error', error.message); // 에러 처리
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchMyReviews() {
      try {
        if (user) {
          const fetchedReviews = await Review_API.getUserReviews({userId: user.id}); // API 함수 호출
          setMyReviews(fetchedReviews);
        }
      } catch (error: any) {
        showError('My Review Fetch Error', error.message); // 에러 처리
      }
    }
    if (user)
      fetchMyReviews();
  }, [user])

  return <UserContext.Provider value={{ user, setUser, myReviews, setMyReviews}}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};