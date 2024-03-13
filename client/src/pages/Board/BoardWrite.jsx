import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function BoardWrite() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };
  const checkAuthorization = async () => {
    try {
      let { data } = await axios.get("http://localhost:3060/token", {
        withCredentials: true,
      });
      data = data.userId;
      setUserId(data);
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

  let [imageFile, setImageFile] = useState(null);
  let [thumbnail, setThumbnail] = useState(null);

  const getPublishedTime = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    return `${year}년 ${month}월 ${day}일`;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnail(reader.result);
      };
    }
  };

  const insertBoardData = async (formData) => {
    const response = await axios.post("http://localhost:3060/board", formData, {
      headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
    });
    return response.data;
  };

  const isLastPage = (lastPageBoardData) => {
    if (lastPageBoardData === undefined) {
      return true;
    }
    return false;
  };

  const queryClient = useQueryClient();
  const mutaion = useMutation((formData) => insertBoardData(formData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("lastestBoardData");
      queryClient.invalidateQueries("myBoardData");
      queryClient.setQueryData("boardData", (prev) => {
        // 가장 마지막 Page에 load된 prev의 data의 마지막 id가 1차이가 난다면? 추가해주기
        let prevBoardData = prev.pages;
        let lastPageBoardData = prevBoardData[prevBoardData.length - 1];
        if (isLastPage(lastPageBoardData)) {
          if (prevBoardData[prevBoardData.length - 2].length === 6) {
            prevBoardData[prevBoardData.length - 1] = [data];
            return { pages: prevBoardData };
          }
          if (prevBoardData[prevBoardData.length - 2].length !== 6) {
            prevBoardData[prevBoardData.length - 2].push(data);
            return { pages: prevBoardData };
          }
        }
        return { pages: prevBoardData };
        // lastPage가 아니면 수정으로 캐싱데이터 변경하지 않아도됨
      });
    },
  });
  // 근데 이렇게 하면 제출하고 나서 캐싱 데이터가 완전히 수정됨

  const handleApi = async (e) => {
    e.preventDefault();
    let [title, content] = e.target.parentElement;
    title = title.value;
    content = content.value;
    let formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("time", getPublishedTime());

    mutaion.mutate(formData);
    navigate("/board");
  };

  const deleteThumbnail = () => {
    setThumbnail(null);
    setImageFile(null);
  };

  return (
    <div>
      <h3>작성페이지</h3>
      <h3 onClick={() => navigate(-1)}>뒤로가기</h3>
      <form>
        <input type="text" placeholder="제목" />
        <p>
          <textarea cols="40" rows="10"></textarea>
        </p>
        {thumbnail === null ? null : (
          <img style={{ width: "20%" }} src={thumbnail}></img>
        )}
        <input onChange={(e) => handleChange(e)} type="file" accept="image/*" />
        <button type="button" onClick={deleteThumbnail}>
          파일삭제
        </button>
        <button onClick={(e) => handleApi(e)}>제출</button>
      </form>
    </div>
  );
}
