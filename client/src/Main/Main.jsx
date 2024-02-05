import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  // 여기서 jwt여부 체크해서 없으면 바로 그냥 로그인으로
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const [userId, setUserId] = useState("");

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

  return (
    <div>
      <h1>메인입니다.</h1>
      <h2>주인은 {userId}</h2>
    </div>
  );
}
