const light = {
  name: "light",
  color: {
    positive: "#516fd4", // color: ${({theme})=>theme.color.positive};
    negative: "#edb87b", // ${({theme})=>theme.color.negative}
    positiveClicked: "#0056b3", // ${({theme})=>theme.color.positiveClicked}
    negativeClicked: "#e58a22", // ${({theme})=>theme.color.negativeClicked}
    text: "black", // ${({theme})=>theme.color.text}
  },
  backgroundColor: {
    main: "white", // background-color: ${({theme})=>theme.backgroundColor.main}
    box: " #fbfcff", // ${({theme})=>theme.backgroundColor.box}
    button: "white", // ${({theme})=>theme.backgroundColor.button}
    input: "#eeeeee", //background-color: ${({theme})=>theme.backgroundColor.input};
  },
  border: {
    main: "1px solid #eeeeee", // ${({theme})=>theme.border.main}
  },
};

const dark = {
  name: "dark",
  color: {
    positive: "#D95585", // 밝은 청색
    negative: "#ff7043", // 밝은 주황색
    positiveClicked: "#1565c0", // 더 진한 청색 클릭될 때
    negativeClicked: "#dd2c00", // 더 진한 주황색 클릭될 때
    text: "white", // 텍스트 색상은 흰색
  },
  backgroundColor: {
    main: "#121212", // 매우 어두운 회색으로 거의 검정색
    box: "#333333", // 박스 배경은 진한 회색
    button: "#424242", // 버튼 배경은 약간 밝은 회색
    input: "#616161", // 입력 필드 배경은 어두운 회색
  },
  border: {
    main: "1px solid #474747", // 경계선은 어두운 회색
  },
};

export const getTheme = (mode) => {
  return mode === "light" ? light : dark;
};
