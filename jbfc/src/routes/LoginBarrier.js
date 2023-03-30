import { Link } from "react-router-dom";

function LoginBarrier() {
  return (
    <div>
      <h1>권한이 없습니다.</h1>
      <h3>로그인을 해주세요.</h3>
      <hr />
      <Link to={`/`}>
        <h4>로그인하러가기!</h4>
      </Link>
    </div>
  );
}
export default LoginBarrier;
