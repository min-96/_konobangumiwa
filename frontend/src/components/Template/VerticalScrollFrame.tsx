import React, { useEffect, useRef, useState } from 'react';

interface VerticalScrollFrameProps {
  fetchNextPage: () => void;
  isLoading: boolean;
  hasMore: boolean;
  children: React.ReactNode;
  className?: string;
}

const VerticalScrollFrame: React.FC<VerticalScrollFrameProps> = ({
  fetchNextPage,
  isLoading,
  hasMore,
  children,
  className,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && hasMore && !isLoading) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (containerRef.current) {
      observer.current.observe(containerRef.current);
    }

    return () => {
      if (observer.current && containerRef.current) {
        observer.current.unobserve(containerRef.current);
      }
    };
  }, [fetchNextPage]);

  return (
    <div ref={containerRef} className={className}>
      {children}
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>End of results</p>}
    </div>
  );
};

export default VerticalScrollFrame;
