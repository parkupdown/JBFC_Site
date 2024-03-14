export const getNickName = () => {
  const nickName = localStorage.getItem("nickname");
  return nickName;
};
export const setNickName = (nickName) => {
  localStorage.setItem("nickname", nickName);
};

export const removeNickName = () => {
  localStorage.removeItem("NickName");
};
