import { useNavigate } from "react-router-dom";
import { removeToken, useAuthStore } from "../../store/authStore";
import { removeNickName } from "../../store/nickNameStore";

export function Auth() {
  const { isLogin, login, logout } = useAuthStore();

  const navigator = useNavigate();

  const handleLog = () => {
    if (isLogin) {
      logout();
      navigator("/login");
    } else {
      navigator(`/login`);
    }
  };

  const goJoin = () => {
    navigator(`/join`);
  };

  return (
    <>
      <span onClick={handleLog}>{isLogin ? "로그아웃" : "로그인"}</span>
      {!isLogin && <span onClick={goJoin}>회원가입</span>}
    </>
  );
}
