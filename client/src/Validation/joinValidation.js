import axios from "axios";

const checkBlank = (input, type) => {
  if (input.length === 0) {
    throw new Error(`${type}에 공백이 존재합니다.`);
  }
};

const checkLength = (input, length, type) => {
  if (input.length < length) {
    throw new Error(`${type}는 ${length}글자 이상의 input 값을 작성해주세요.`);
  }
};

const checkDuplication = async (input, type) => {
  const { data } = await axios.get(
    `http://localhost:3060/join?input=${input}&type=${type}`
  );
  if (data) {
    throw new Error(`${type}이 중복됩니다.`);
  }
};

export default async function joinValidation(
  userId,
  userPassword,
  userNickName
) {
  try {
    checkBlank(userId, "ID");
    checkBlank(userPassword, "PASSWORD");
    checkBlank(userNickName, "NICKNAME");
    checkLength(userId, 6, "ID");
    checkLength(userPassword, 8, "PASSWORD");
    checkLength(userNickName, 2, "NICKNAME");
    await checkDuplication(userId, "ID");
    await checkDuplication(userNickName, "NICKNAME");
  } catch (error) {
    throw new Error(error);
  }
}
