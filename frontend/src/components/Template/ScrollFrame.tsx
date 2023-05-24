import { FC, ReactNode, useEffect, useReducer, useRef, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface PageProps {
  children: ReactNode;
  handleScrollEnd?: () => Promise<boolean>;
};

const ScrollFrame: FC<PageProps> = ({children, handleScrollEnd}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftEnd, setIsLeftEnd] = useState(true);
  const [isRightEnd, setIsRightEnd] = useState(false);
  const [befScrollWidth, setBefScrollWidth] = useState(0);
  
  const checkScrollEnd = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const isScrollEnd = scrollLeft >= scrollWidth - clientWidth

      setIsLeftEnd(scrollLeft === 0);
      setIsRightEnd(isScrollEnd);
    }
  };

  useEffect(() => {
    async function isRight() {
      if (scrollContainerRef.current) {
        const { scrollWidth } = scrollContainerRef.current;
        if (isRightEnd && handleScrollEnd && scrollWidth !== befScrollWidth) {
          handleScrollEnd().then((ret) => {
            setIsRightEnd(!ret);
          });
          setBefScrollWidth(scrollWidth);
        }
      }
    }
    isRight();
  }, [isRightEnd])

  useEffect(() => {
    // Add event listener for scroll event to update the button states
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', checkScrollEnd);
    }
    return () => {
      // Clean up the event listener when the component is unmounted
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', checkScrollEnd);
      }
    };
  }, []);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {!isLeftEnd &&
        <button
          style={{zIndex: 1, position: 'absolute', top:'50%', transform: 'translateY(-50%)', left: -15}}
          onClick={() => scroll(-500)}>
          <FaArrowCircleLeft className={`h-10 w-10 text-blue-700 duration-300 hover:scale-110`} />
        </button>
      }
      <div className="flex overflow-auto hide-scrollbar" ref={scrollContainerRef}>
        {children}
      </div>
      {!isRightEnd &&
        <button
          style={{zIndex: 1, position: 'absolute', top:'50%', transform: 'translateY(-50%)', right: -15}}
          onClick={() => scroll(500)}>
          <FaArrowCircleRight className={`h-10 w-10 text-blue-700 duration-300 hover:scale-110`} />
        </button>
      }
    </div>
  )
};

export default ScrollFrame;