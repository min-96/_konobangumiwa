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
  const observeRef = useRef<HTMLDivElement | null>(null);

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
      threshold: 0.8,
    });

    if (observeRef.current) {
      observer.current.observe(observeRef.current);
    }

    return () => {
      if (observer.current && observeRef.current) {
        observer.current.unobserve(observeRef.current);
      }
    };
  }, [fetchNextPage]);

  return (
    <div className={className}>
      {children}
      <div className="border-primary border-2 " ref={observeRef}></div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default VerticalScrollFrame;
