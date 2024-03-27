export const inputProps = (errors) => [
  {
    id: "id",
    name: "아이디",
    max: 13,
    min: 5,
    error: errors.id,
  },
  {
    id: "password",
    name: "비밀번호",
    max: 13,
    min: 5,
    error: errors.password,
  },
  {
    id: "passwordRe",
    name: "비밀번호확인",
    max: 13,
    min: 5,
    error: errors.passwordRe,
  },
  {
    id: "nickName",
    name: "닉네임",
    max: 10,
    min: 2,
    error: errors.nickName,
  },
];
