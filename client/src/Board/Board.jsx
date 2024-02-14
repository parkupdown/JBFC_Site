import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
`;
const BoardContainerWrrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const BoardContainer = styled.div`
  width: 25vw;
  height: 25vh;
  background-color: aliceblue;
  padding: 20px;
  border: 1px dotted black;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span {
    font-size: 16px;
  }
`;

export default function Board() {
  const [boardData, setBoardData] = useState([]);
  const [page, setPage] = useState(0);
  const ref = useRef(null);
  //여기서 한번 불러와보자
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  const getBoardData = async () => {
    const board = await axios.get(`http://localhost:3060/board?limit=${page}`);
    console.log(board, page);
    if (board.data === false) {
      return;
    }
    setBoardData((current) => [...current, ...board.data]);
    setPage((current) => current + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 화면에 보이는지 여부 확인
          // 추가 데이터를 가져오는 함수 호출
          getBoardData();
        }
      });
    });

    // containerRef가 설정되었을 때만 observe를 호출합니다.
    if (ref.current) {
      observer.observe(ref.current);
    }

    // observer 해제
    return () => {
      observer.disconnect();
    };
  }, [page]);

  const checkAuthorization = async () => {
    try {
      await axios.get("http://localhost:3060/token", {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error("세션이 만료되었습니다.");
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        await checkAuthorization();
      } catch (error) {
        alert(error);
        goLogin();
      }
    };
    checkUserSession();
  }, []);

  return (
    <Container>
      <h1>게시판</h1>
      <Link to={`/board/write`}>
        <h2>게시글 작성</h2>
      </Link>
      <BoardContainerWrrap>
        {boardData.map((data, key) => (
          <Link key={key} to={"/board/detail"} state={{ boardId: data.id }}>
            <BoardContainer id={data.id}>
              {data.thumbnail !== null ? (
                <img src={`http://localhost:3060/image/${data.thumbnail}`} />
              ) : (
                <img src="http://localhost:3060/image/thumbnail.jpeg"></img>
              )}
              <span>{data.title}</span>
            </BoardContainer>
          </Link>
        ))}
      </BoardContainerWrrap>
      <div ref={ref}></div>
    </Container>
  );
}
