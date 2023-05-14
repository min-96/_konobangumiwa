import { FC, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
};

const DetailCardFrame: FC<PageProps> = ({children, className}) => {
  return (
    <div className={`w-[700px] lg:w-[1000px] md:w-[700px] ${className}`}>
      {children}
    </div>
  );
};

export default DetailCardFrame;