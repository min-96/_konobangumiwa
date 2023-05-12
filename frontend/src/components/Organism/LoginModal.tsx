import React from 'react';

interface LoginModalProps {
  handleModalClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({handleModalClose}) => {
  return (
    <div>
      <h2>모달</h2>
      <button className="modal-close" onClick={handleModalClose}>
        닫기
      </button>
    </div>
  );
};

export default LoginModal;
