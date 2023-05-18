import React from 'react';
import ModalFrame from '../Template/ModalFrame';

interface LoginModalProps {
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({handleClose}) => {
  return (
    <ModalFrame handleModalClose={handleClose} >
      <div>
        <h2>모달</h2>
        <button className="modal-close" onClick={handleClose}>
          닫기
        </button>
      </div>
    </ModalFrame>
  );
};

export default LoginModal;
