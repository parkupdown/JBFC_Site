import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

export const useBoardInfinite = (ref, keyName, queryFn) => {
  let { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: keyName,
    queryFn: queryFn,
    getNextPageParam: (lastPage, allpages) => {
      const nextPage = allpages.length;
      if (lastPage === undefined) {
        return undefined;
      }
      return nextPage;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    if (!hasNextPage) {
      observer.disconnect();
    }
    return () => observer.disconnect();
  }, [hasNextPage]);

  return { isLoading, data };
};
