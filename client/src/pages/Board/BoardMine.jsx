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
  const { register, handleSubmit, watch } = useForm();

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
      <div className="deleteMode">
        {deleteMode && (
          <>
            <button className="read" onClick={offDeleteMode}>
              읽기모드
            </button>
            <button onClick={handleSubmit(onSubmit)}>제출</button>
          </>
        )}
        {!deleteMode && (
          <button className="delete" onClick={onDeleteMode}>
            삭제모드
          </button>
        )}
      </div>

      <BoardContainer>
        {data.pages[0].length === 0 && <h4>내가 작성한 게시글이 없습니다.</h4>}
        {data.pages.map(
          (page) =>
            page &&
            page.map((boardData, index) => (
              <div className="deleteContentBox">
                <div className="deleteBox">
                  {deleteMode && (
                    <label
                      htmlFor={index}
                      style={{
                        backgroundColor:
                          watch(String(boardData.id)) === true
                            ? "#516fd4"
                            : "#edb87b",
                      }}
                    >
                      {watch(String(boardData.id)) === true
                        ? "선택됨"
                        : "삭제가능"}
                      <input
                        id={index}
                        type="checkbox"
                        {...register(`${boardData.id}`)}
                      />
                    </label>
                  )}
                </div>
                <Content
                  boardData={boardData}
                  key={boardData.id}
                  deleteMode={deleteMode}
                />
              </div>
            ))
        )}
      </BoardContainer>
      <div ref={ref}></div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  .deleteMode {
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
    @media (max-width: 800px) {
      margin-bottom: 20px;
    }
    button {
      background-color: ${({ theme }) => theme.backgroundColor.box};
      border: ${({ theme }) => theme.border.main};
      padding: 5px 20px;
      border-radius: 7px;
      color: ${({ theme }) => theme.color.positive};
      font-size: 16px;
      @media (max-width: 800px) {
        font-size: 12px;
      }
    }

    .delete {
      color: ${({ theme }) => theme.color.negative};
    }
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  .deleteContentBox {
    display: flex;
    flex-direction: column;
  }

  .deleteBox {
    input {
      display: none;
    }
    label {
      font-size: 12px;
      padding: 3px 10px;
      color: white;
      margin: 0 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  }
`;
