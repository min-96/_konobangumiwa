import { FC } from "react";
import { useParams } from "react-router-dom";

interface PageProps {
};

const Detail: FC<PageProps> = ({}) => {
  const { contentId } = useParams();

  return (
    <div>
      <h2>Content ID: {contentId}</h2>
    </div>
  );
};

export default Detail;