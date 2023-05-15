import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PageProps {
  children: ReactNode;
  handleModalClose: ()=>void;
};

const ModalFrame: FC<PageProps> = ({children, handleModalClose}) => {
  return createPortal(
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
    </div>,
    document.body // Portal 을 이용해서 전체 영역에 modal-overlay가 적용되도록함
  );
};

export default ModalFrame;
