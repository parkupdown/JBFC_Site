import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import logo from "../../assets/logo/logo.png";
export function GoBack() {
  const { isLogin, login, logout } = useAuthStore();
  const navigator = useNavigate();
  const goBack = () => navigator(-1);

  return <>{isLogin && <span onClick={goBack}>뒤로가기</span>}</>;
}
