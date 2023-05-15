import { FC, ReactNode } from "react";
import { IoCloseOutline } from 'react-icons/io5'

interface PageProps {
  children: ReactNode;
  handleModalClose: ()=>void;
};

const ModalFrame: FC<PageProps> = ({children, handleModalClose}) => {
  return (
    <div className="modal-overlay" onClick={handleModalClose}>
      {/* modal-overlay영역을 클릭할땐 모달이 닫히고, modal을 클릭했을땐 닫히지 않도록함 */}
      <div
        className="modal"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); }}
      >
        {
          children
        }
      </div>
    </div>
  );
};

export default ModalFrame;