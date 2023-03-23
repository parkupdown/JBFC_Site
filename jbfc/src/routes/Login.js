import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <form>
        <input placeholder="ID를 입력해주세요 " />
        <input placeholder="PASSWORD를 입력해주세요" />
        <button>제출</button>
      </form>
      <Link to={`/sign`}>
        <h3>아이디가 없으신가요?</h3>
      </Link>
    </div>
  );
}

export default Login;
