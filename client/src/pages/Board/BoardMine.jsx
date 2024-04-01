import { useRef } from "react";
import styled from "styled-components";
import { Content } from "./BoardContent";
import { useBoardInfinite } from "@/hooks/useBoardInfinite";
import { fetchMyBoard } from "@/api/board.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDeleteBoard, resetBoardCacheData } from "@/api/board.api";

export default function BoardMine() {
  const ref = useRef(null);
  const { data, isLoading } = useBoardInfinite(
    ref,
    "myBoardData",
    fetchMyBoard
  );

  const [deleteMode, setDeleteMode] = useState(false);
  const onDeleteMode = () => setDeleteMode(true);
  const offDeleteMode = () => setDeleteMode(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const deleteBoardIdArr = Object.keys(data).filter(
      (key) => data[key] === true
    );

    if (deleteBoardIdArr.length === 0) {
      return;
    } // 삭제하고자하는 데이터가 없다면 api요청을 보내지 않음

    await fetchDeleteBoard(deleteBoardIdArr);
    resetBoardCacheData();
    offDeleteMode();
  };

  if (isLoading || !data.pages) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <BoardContainer>
        {deleteMode && (
          <>
            <button onClick={offDeleteMode}>읽기모드</button>
            <button onClick={handleSubmit(onSubmit)}>제출</button>
          </>
        )}
        {!deleteMode && <button onClick={onDeleteMode}>삭제모드</button>}
        {data.pages[0].length === 0 && <h4>내가 작성한 게시글이 없습니다.</h4>}
        {data.pages.map(
          (page) =>
            page &&
            page.map((boardData) => (
              <>
                <div className="deleteBox">
                  {deleteMode && (
                    <input type="checkbox" {...register(`${boardData.id}`)} />
                  )}
                </div>

                <Content
                  boardData={boardData}
                  key={boardData.id}
                  deleteMode={deleteMode}
                />
              </>
            ))
        )}
      </BoardContainer>
      <div ref={ref}></div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
`;
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  align-items: center;
  .deleteBox {
    @media (max-width: 860px) {
      width: 70vw;
    }
    width: 340px;
    text-align: end;
    input {
      width: 20px;
      height: 20px;
    }
  }
`;
