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
    await axios.post("http://localhost:3060/board", formData, {
      headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
    });
  };

  const queryClient = useQueryClient();
  const mutaion = useMutation((formData) => insertBoardData(formData), {
    onSuccess: () => {
      queryClient.invalidateQueries("boardData");
    },
  });

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
