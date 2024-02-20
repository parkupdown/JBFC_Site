import axios from "axios";
export const CheckAuthorization = () => {
  const checkAuthorization = async () => {
    try {
      let { data } = await axios.get("http://localhost:3060/token", {
        withCredentials: true,
      });

      const userId = data.userId;
      return userId;
    } catch (error) {
      throw new Error("세션이 만료되었습니다.");
    }
  };

  return checkAuthorization();
};
