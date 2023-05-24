import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../Organism/Profile";
import UserMovieList from "../Organism/UserMovieList";
import { User as UserType } from "../../types/movie"
import * as API from "../../API/User";

interface PageProps {
};

const User: FC<PageProps> = ({ }) => {
  const { userId } = useParams();
  const [ targetUser, setTargetUser] = useState<UserType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUser() {
      if (userId) {
        const fetchedUser = await API.getUserData({id: Number.parseInt(userId)});
        setTargetUser(fetchedUser);
      }
    }
    fetchUser();
  }, [userId]);

  if (!targetUser || !userId)
    return null;

  return (
    <div className="w-full flex flex-col items-center">
      <Profile frameClassName="mt-6 shadow-border rounded-lg" targetUser={targetUser}/>
      <UserMovieList frameClassName="mt-6 shadow-border rounded-lg" userId={Number.parseInt(userId, 10)}/>
    </div>
  );
};

export default User;