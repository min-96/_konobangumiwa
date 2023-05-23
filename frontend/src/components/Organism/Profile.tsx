import React from 'react';
import CardFrame from '../Template/CardFrame';
import EditableTextarea from '../Atom/EditableTextarea';
import ProfileImage from '../Molecule/User/ProfileImage';
import EditableInput from '../Atom/EditableInput';
import { User } from '../../types/movie';
import * as API from '../../API/User';
import { useUser } from '../../hook/UserContext';
import { useError } from '../../hook/ErrorContext';

interface ProfileProps {
  frameClassName?: string;
  targetUser: User;
}

const Profile: React.FC<ProfileProps> = ({ frameClassName, targetUser }) => {
  const { user, setUser } = useUser();
  const { showError } = useError();

  if (!user)
    return null;

  const isEditable = targetUser.id === user.id;

  return (
    <CardFrame className={frameClassName} title=" ">
      <div className="flex flex-col items-center mb-4">
        <ProfileImage
          initImage={targetUser.pictureUrl || ''}
          saveProcess={(content: string)=>{
            try {
              API.updateUserData({pictureUrl: content});
              setUser({...user, pictureUrl: content});
            }
            catch (error: any) {
              showError('EditProfile Error', error.message);
            }
          }}
          isEditable={isEditable}
        />
        <EditableInput
          initContent={targetUser.displayName}
          saveProcess={(content: string)=>{
            try {
              API.updateUserData({displayName: content});
              setUser({...user, displayName: content});
            }
            catch (error: any) {
              showError('EditProfile Error', error.message);
            }
          }}
          isEditable={isEditable}
        />
      </div>
      <hr/>
      <EditableTextarea
        inputHeight="40"
        initContent={targetUser.introduction || ''}
        saveProcess={(content: string)=>{
          try {
            API.updateUserData({introduction: content});
          }
          catch (error: any) {
            showError('EditProfile Error', error.message);
          }
        }}
        deleteProcess={()=>{
          try {
            API.updateUserData({introduction: ''});
          }
          catch (error: any) {
            showError('DeleteProfile Error', error.message);
          }
        }}
        align="center"
        maxChars={100}
        isEditable={isEditable}
      />

    </CardFrame>
  );
};

export default Profile;
