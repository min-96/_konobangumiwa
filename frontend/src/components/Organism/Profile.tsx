import React from 'react';
import CardFrame from '../Template/CardFrame';
import EditableTextarea from '../Atom/EditableTextarea';
import ProfileImage from '../Molecule/User/ProfileImage';
import EditableInput from '../Atom/EditableInput';

interface ProfileProps {
  nickname: string;
  introduce?: string;
  frameClassName?: string;
}

const Profile: React.FC<ProfileProps> = ({ nickname, frameClassName, introduce }) => {
  return (
    <CardFrame className={frameClassName} title=" ">
      <div className="flex flex-col items-center mb-4">
        <ProfileImage />
        <EditableInput initContent={nickname}/>
      </div>
      <hr/>
      <EditableTextarea
        inputHeight="40"
        initContent={introduce}
        saveProcess={(content:string)=>{}}
        deleteProcess={()=>{}}
        align="center"
        maxChars={100}
      />

    </CardFrame>
  );
};

export default Profile;
