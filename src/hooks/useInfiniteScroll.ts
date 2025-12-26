import { useRef, useState, useCallback } from "react";

export const useInfiniteScroll = (
  totalItems: number,
  itemsPerPage: number = 9
) => {
  const [limit, setLimit] = useState(itemsPerPage);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && limit < totalItems) {
          setLimit((prevLimit) => prevLimit + itemsPerPage);
        }
      });

      observerRef.current.observe(node);
    },
    [limit, totalItems, itemsPerPage]
  );

  return { limit, lastElementRef };
};
