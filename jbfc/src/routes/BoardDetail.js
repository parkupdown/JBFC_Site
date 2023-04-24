import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loading from "./Loading";
import styled from "styled-components";
import api from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 100vh;
  overflow-y: scroll;
`;

const Title = styled.h2`
  font-size: 42px;
  margin: 20px 0;
  font-weight: 560;
`;

const Author = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: #3b5998;
  padding: 8px;
  opacity: 0.5;
`;

const Content = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 200px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  width: 90vw;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #1877f2;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #3b5998;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

const Comment = styled.li`
  font-size: 16px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const CommentText = styled.span`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
  border: none;
  background-color: #f02849;
  color: white;
  cursor: pointer;
  margin-right: 30px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 3px 10px;
  margin-top: 0px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 30px;

  &:hover {
    background-color: #166fe5;
  }

  &:active {
    background-color: #146fd1;
  }
`;

const JJACKTitle = styled.h3`
  text-align: center;
  font-size: 36px;
  color: #3b5998;
  font-weight: 400;
  margin-top: 10px;
  margin-right: 30px;
`;

function BoardDetail() {
  //유저가 클릭한 게시글의 고유 ID를 useParams를 통해 가져옴
  const { userId } = useParams();

  // 유저의 로그인 정보를 가져옴
  const userName = localStorage.getItem(`userId`);
  const [detail, setDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const navigator = useNavigate();
  const time = new Date();
  const nowTime = `${
    time.getMonth() + 1
  }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;

  // 유저가 클릭한 게시글의 고유 id를 비교해 해당 id의 detailData를 detail에 저장
  const getBoardDetailApi = () =>
    axios
      .post(`${api.BASE_URL}/boardDetail`, {
        userId: userId,
      })
      .then((res) => setDetail(res.data));

  //DB에 userId를 보내서 useId와 일치하는 댓글 데이터를 가져와 comment에 저장
  const getBoardCommentsApi = () => {
    return axios
      .post(`${api.BASE_URL}/board/comment/get`, {
        userId: userId,
      })
      .then((res) => setComment(res.data));
  };

  // 댓글을 달면 board의 고유 id를 기억 userName,comment,time을 저장함
  const pushBoardCommentsApi = (userId, userName, inputValue) => {
    return axios
      .post(`${api.BASE_URL}/board/comment`, {
        userId: userId,
        userName: userName,
        comment: inputValue,
        time: nowTime,
      })
      .then((res) => setComment(res.data));
  };

  // 위 페이지에 들어오면 댓글정보를 볼 수 있게 API를 최초에 1회 호출함
  useEffect(() => {
    getBoardDetailApi();
    getBoardCommentsApi();
  }, []);

  // 댓글을 Submit하면  DB에 새로운 댓글에대한 내용 저장 후 알림
  const onSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.currentTarget[0].value;
    pushBoardCommentsApi(userId, userName, inputValue);
    event.currentTarget[0].value = ``;
    swal("성공", "댓글작성이 완료되었습니다.", "success");
  };

  //본인이 작성한 뎃글인지 판단
  const CheckCommentHost = (userName, commentName) => {
    if (userName !== commentName) {
      return swal(
        "오류발생",
        "본인이 작성한 댓글만 삭제할 수 있습니다.",
        "warning"
      );
    }
  };

  // userName과 게시글 고유의 id를 비교하여 게시글의 댓글을 삭제
  const DeleteBoardMentApi = (userName, id) => {
    axios.delete(`${api.BASE_URL}/board/mine/comment/delete`, {
      data: { userName: userName, _id: id },
    });
  };

  // 유저에게 서버와 로딩하는 시간없이 바로 지워지는 것처럼 함
  const DeleteUI = (ListId) => {
    setComment((current) => {
      const newMine = current.filter(
        (item, index) => index !== parseInt(ListId)
      );

      return newMine;
    });
    swal("성공", "댓글삭제가 완료되었습니다.", "success");
  };

  // 댓글 삭제를 실행하는 함수
  const commentRemove = (event, userName, commentName, id) => {
    CheckCommentHost(userName, commentName);
    DeleteBoardMentApi(userName, id);

    const listId = event.currentTarget.parentElement.id;
    DeleteUI(listId);
  };

  return (
    <Container>
      {detail === null || comment === null ? (
        <Loading></Loading>
      ) : (
        <>
          <div
            style={{
              height: "5vh",
              width: "100vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <BackButton onClick={() => navigator(`/board`)}>
              뒤로가기
            </BackButton>
            <JJACKTitle>JJACK BALANCE</JJACKTitle>
          </div>
          <Title>{detail.title}</Title>
          <div
            style={{ display: "flex", justifyContent: "left", width: "100vw" }}
          >
            <Author>작성자: {detail.userId}</Author>
          </div>
          <Content>{detail.contents}</Content>
          <Form onSubmit={onSubmit}>
            <Input placeholder="올바른 댓글 문화" />
            <Button>💬</Button>
          </Form>
          <CommentList>
            {comment.map((item, index) => (
              <Comment id={index} key={item._id}>
                <CommentText>{`${item.time} ${item.userName}: ${item.comment}`}</CommentText>
                {userName === item.userName && (
                  <DeleteButton
                    onClick={(event) =>
                      commentRemove(event, userName, item.userName, item._id)
                    }
                  >
                    댓글삭제
                  </DeleteButton>
                )}
              </Comment>
            ))}
          </CommentList>
        </>
      )}
    </Container>
  );
}

export default BoardDetail;
