import { FC, useEffect, useState } from "react";
import MovieList from "../Organism/MovieList";
import "./Home.css"; 
import CardFrame from "./CardFrame";
import { useError } from "../../hook/ErrorContext";
import * as API from "../../API/Animation";

interface PageProps {
};

const Home: FC<PageProps> = ({}) => {

  // const [ tags, setTags ] = useState<string[]>([]);
  // const { showError } = useError();

  const tags = [
    {
      title: "이 라이트노벨이 대단하다",
      tags: [
        "이 라이트노벨이 대단하다",
      ]
    },
    {
      title: "보기만해도 오싹해지는 스릴러",
      tags: [
        "스릴러",
      ]
    },
  ]

  function shuffle(array: string[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  

  // useEffect(() => {
  //   async function fetchTags () {
  //     try {
  //       const ret = await API.getAllTags();
  //       setTags(ret.map((elem : any)=>(elem.type)));
  //     }
  //     catch (e: any) {
  //       showError("fetch Tags Error", e.message);
  //     }
  //   }
  //   fetchTags();
  // }, []);

  return (
    <div className="home-page mb-12">
      <CardFrame title="인기순" fontSize="2xl">
        <MovieList keyName="pop" queryName="popularityAnimations"/>
      </CardFrame>
      <CardFrame title="최신순" fontSize="2xl">
        <MovieList keyName="new" queryName="newAnimations" />
      </CardFrame>
      {/* {
        shuffle(tags).slice(0, 2).map((elem, index) => {
          return (
            <CardFrame key={`tags_${index}`} title={elem} fontSize="2xl">
              <MovieList keyName={`tagsc_${index}`} queryString={`tagTypeAnimations (type: ${elem})`} />
            </CardFrame>
          )
        })
      } */}
      {
        tags.map((elem, index) => {
          return (
            <CardFrame key={`tags_${index}`} title={elem.title} fontSize="2xl">
              <MovieList keyName={`tagsc_${index}`} queryName={`tagTypeAnimations`} queryParams={`(type: ${JSON.stringify(elem.tags)})`} />
            </CardFrame>
          )
        })
      }
    </div>
  );
};

export default Home;