import { useEffect } from "react";
import { useState } from "react";

import { fetchGetComment } from "@/api/comment.api";
export const useComment = (boardId) => {
  const [comments, setComments] = useState("");
  useEffect(() => {
    const getData = async () => {
      const data = await fetchGetComment(boardId);
      setComments(data);
    };
    getData();
  }, [boardId]);
  return { comments, setComments };
};
