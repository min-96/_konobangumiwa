import { FC, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
  title?: string;
};

const DetailCardFrame: FC<PageProps> = ({children, className, title}) => {
  return (
    <div className={`w-[700px] lg:w-[1000px] md:w-[700px] ${className}`}>
      {
        title ?
        <div className="m-6">
          <h2 className="text-xl font-bold mb-2">
            {title}
          </h2>
          {children}
        </div>
        : children
      }
    </div>
  );
};

export default DetailCardFrame;