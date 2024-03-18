import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
export function GoBack() {
  const { isLogin, login, logout } = useAuthStore();
  const navigator = useNavigate();
  const goBack = () => navigator(-1);
  const goHome = () => isLogin && navigator("/");
  return (
    <>
      <h1 onClick={goHome}>짝발란스</h1>
      {isLogin && <p onClick={goBack}>뒤로가기</p>}
    </>
  );
}
