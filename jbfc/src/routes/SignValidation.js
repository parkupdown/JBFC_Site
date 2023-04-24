class SignValidation {
  constructor(teamName, nickName, userId, userPassword) {
    this.teamName = teamName;
    this.nickName = nickName;
    this.userId = userId;
    this.userPassword = userPassword;
  }
  // 공백이 있는지 확인하는 Validation
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

  // 입력란을 모두 채웠는지 확인하는 Validation
  CheckNull = () => {
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

  // 특수문자가 없도록하기위해 특수문자를 검열하는 Validation
  CheckSpecial = () => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return regExp.test(this.userId) || regExp.test(this.nickName)
      ? `ID/NickName에 특수문자는 넣을 수 없습니다.`
      : true;
  };
}
export default SignValidation;
