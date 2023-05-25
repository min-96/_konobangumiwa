import { FC, useState } from "react";
import FinderMovieList from "../Molecule/Finder/FinderMovieList";
import FinderTagList from "../Molecule/Finder/FinderTagList";
import SelectTagList from "../Molecule/Finder/SelectTagList";

interface PageProps {}

const Finder: FC<PageProps> = ({}) => {
  const [selectTags, setSelectTags] = useState<string[]>([]);

  return (
    <div className="flex h-[calc(100vh-60px)]"
    >
      <div className="w-64 overflow-y-auto bg-primary">
        <FinderTagList selectTags={selectTags} setSelectTags={setSelectTags} />
      </div>
      <div className="flex-1 overflow-y-auto flex-col">
        { selectTags.length > 0 && <SelectTagList selectTags={selectTags} setSelectTags={setSelectTags}/> }
        <FinderMovieList selectTags={selectTags}/>
      </div>
    </div>
  );
};

export default Finder;
