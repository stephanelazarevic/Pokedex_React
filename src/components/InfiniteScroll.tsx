import React, { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  onLoadMore: () => void;
  isLoading: boolean;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onLoadMore, isLoading }) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isLoading) {
      onLoadMore();
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver);
    const target = document.querySelector('#scroll-anchor');
    if (target) observer.current.observe(target);

    return () => {
      observer.current?.disconnect();
    };
  }, [isLoading]);

  return <div id="scroll-anchor" className="h-10"></div>;
};

export default InfiniteScroll;
