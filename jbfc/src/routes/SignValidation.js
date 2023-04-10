class SignValidation {
  constructor(teamName, nickName, userId, userPassword) {
    this.teamName = teamName;
    this.nickName = nickName;
    this.userId = userId;
    this.userPassword = userPassword;
  }

  CheckBlank = () => {
    if (this.userId !== null && this.nickName !== null) {
      const arrUserId = this.userId.split(``);
      const arrNickName = this.nickName.split(``);
      return arrUserId.includes(` `) || arrNickName.includes(` `)
        ? `ID/NickName에 공백을 제거해주세요.`
        : true;
    }
    return true;
  };
  CheckNull = () => {
    //check버튼을 누르는 순간 각 this 값들은 ""이 됨 (setState 됨으로)
    if (
      this.teamName === "" ||
      this.nickName === "" ||
      this.userId === "" ||
      this.userPassword === ""
    ) {
      return `입력란을 모두 채워주세요.`;
    }
    return true;
  };

  CheckSpecial = () => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return regExp.test(this.userId) || regExp.test(this.nickName)
      ? `ID/NickName에 특수문자는 넣을 수 없습니다.`
      : true;
  };
}
export default SignValidation;
