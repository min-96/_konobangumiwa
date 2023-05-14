import React from 'react';
import CardFrame from '../Template/CardFrame';

interface DetailInfoProps {
  frameClassName: string;
}

const DetailInfo: React.FC<DetailInfoProps> = ({frameClassName}) => {
  return (
    <CardFrame className={frameClassName} title="기본정보">
      <p>
        Guardians of the Galaxy Vol. 3
      </p>
      <p>
        2023 · 미국 · 액션
      </p>
      <p>
        2시간 30분 · 12세
      </p>
      <p className="mt-3">
        ‘가모라’를 잃고 슬픔에 빠져 있던 ‘피터 퀼’이 위기에 처한 은하계와 동료를 지키기 위해 다시 한번 가디언즈 팀과 힘을 모으고, 성공하지 못할 경우 그들의 마지막이 될지도 모르는 미션에 나서는 이야기
      </p>
    </CardFrame>
  );
};

export default DetailInfo;
