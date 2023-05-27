import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface ScrollFrameProps {
  children: ReactNode;
  handleScrollEnd?: () => Promise<boolean>;
}

const ScrollFrame: FC<ScrollFrameProps> = ({ children, handleScrollEnd }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftEnd, setIsLeftEnd] = useState(true);
  const [isRightEnd, setIsRightEnd] = useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const handleScroll = async () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      const isScrollEnd = scrollLeft + clientWidth + 1 >= scrollWidth;
      console.log(isScrollEnd, scrollLeft, scrollWidth, clientWidth);
      setIsLeftEnd(scrollLeft === 0);
      setIsRightEnd(isScrollEnd);

      if (handleScrollEnd && isScrollEnd) {
        const shouldLoadMore = await handleScrollEnd();
        setIsRightEnd(!shouldLoadMore);
        if (shouldLoadMore) {
          scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(()=>{handleScroll()}, 100);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative">
      {!isLeftEnd && (
        <button
          style={{ zIndex: 1, position: "absolute", top: "50%", transform: "translateY(-50%)", left: -15 }}
          onClick={() => scroll(-500)}
        >
          <FaArrowCircleLeft className={`h-10 w-10 text-blue-700 duration-300 hover:scale-110`} />
        </button>
      )}
      <div className="flex overflow-auto hide-scrollbar" ref={scrollContainerRef}>
        {children}
      </div>
      {!isRightEnd && (
        <button
          style={{ zIndex: 1, position: "absolute", top: "50%", transform: "translateY(-50%)", right: -15 }}
          onClick={() => scroll(500)}
        >
          <FaArrowCircleRight className={`h-10 w-10 text-blue-700 duration-300 hover:scale-110`} />
        </button>
      )}
    </div>
  );
};

export default ScrollFrame;
