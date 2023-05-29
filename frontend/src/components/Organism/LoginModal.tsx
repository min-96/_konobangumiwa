import React from 'react';
import ModalFrame from '../Template/ModalFrame';
import GoogleLoginButton from '../Atom/GoogleLoginButton';

interface LoginModalProps {
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({handleClose}) => {

  return (
    <ModalFrame handleModalClose={handleClose} frameClassName="bg-primary border-white-200 border">
      <div className="h-24">
        <h2 className="text-xl mb-4 text-white">로그인</h2>
        <GoogleLoginButton />
      </div>
    </ModalFrame>
  );
};

export default LoginModal;
