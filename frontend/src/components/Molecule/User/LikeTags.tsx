import React from 'react';
import { TypeCount } from '../../../types/movie';

interface LikeTagsProps {
  list: TypeCount[];
}

const LikeTags: React.FC<LikeTagsProps> = ({ list }) => {
  const countSortedList = list.slice().sort((a, b) => (b.count - a.count));
  const lengthSortedList = list.slice().sort((a, b) => b.type.length - a.type.length);

  const minBoldCount = countSortedList[Math.floor(list.length / 3)]?.count || 0;

  const lastCnt = lengthSortedList[lengthSortedList.length - 1]?.count || 0;


  const calculateSize = () => {
    const ratio = 1.2;
    return (text:string, fontSize: number) => {
      const length = text.length * fontSize;
      const width = length > 200 ? 200 : length;
      const height = Math.floor(ratio * fontSize * (length / width));
      return {width, height};
    }
  }

  const calculatePosition = () => {
    const minX = 0; // X 축 최소 값
    const minY = 0; // Y 축 최소 값
    const maxX = 550; // X 축 최대 값
    const maxY = 300; // Y 축 최대 값

    // 요소들의 좌표와 크기를 저장하는 배열
    const positions: { x: number; y: number; width: number, height: number }[] = [];

    const getSize = calculateSize();

    return (type: string, fontSize: number) => {
      let x: number = 0;
      let y: number = 0;
      let collision = true;

      const {width, height} = getSize(type, fontSize);

      // 겹침을 감지하고 조정
      while (collision) {
        x = Math.random() * (maxX - minX - width) + minX;
        y = Math.random() * (maxY - minY - height) + minY;

        // 요소들과의 충돌 검사
        collision = positions.some((pos) => 
          (pos.x + pos.width >= x &&
            pos.x <= x + width &&
            pos.y + pos.height >= y &&
            pos.y <= y + height)
        );

        if (!collision) {
          // 충돌이 없으면 좌표 저장
          positions.push({ x, y, width, height });
        }
        console.log("========");
      }

      return { x, y, width, height };
    };
  };

  const getPosition = calculatePosition();

  return (
    <div className="flex justify-center">
      <div className="w-[550px] h-[300px] relative text-blue-600">
        {lengthSortedList.map((elem) => {
          const calc = 15 + (elem.count - lastCnt) * 2;
          const fontSize = calc > 30 ? 30 : calc;
          const { x, y, width, height } = getPosition(elem.type, fontSize);

          return (
            <span
              key={elem.type}
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: minBoldCount <= elem.count ? 'bold' : 'normal', 
                position: 'absolute',
                width: `${width}px`,
                height: `${height}px`,
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              {elem.type}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LikeTags;
