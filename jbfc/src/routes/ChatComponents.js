import styled from "styled-components";

function ChatComponents() {
  const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    color: #333;
  `;

  const ChatContainer = styled.div`
    margin-top: 0px;
    height: 80vh;
    overflow-y: scroll;
    flex-direction: column-reverse;
    display: flex;
  `;

  const InputContainer = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input {
      flex: 1;
      margin-top: 1rem;
      margin-right: 0.5rem;
      margin-left: 1rem;
      padding: 0.5rem;
      border-radius: 13px;
      border: none;
    }

    button {
      background-color: #03a9f4;
      color: #fff;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      margin-top: 1rem;
      &:hover {
        background-color: #03a9f4;
      }
    }
  `;

  const ChatList = styled.ul`
    list-style: none;
    margin: 20px 40px;
    padding: 0;

    li {
      margin-top: 17px;
    }

    span {
      margin-right: 1rem;
      margin-left: 1rem;
      margin-bottom: 0;
      align-items: end;
      border-radius: 16px;
      padding: 16px 16px;
      background-color: #03a9f4;
      color: #fff;
      display: inline-block;
      max-width: 100%;
      white-space: pre-wrap;
      word-break: break-all;
    }
  `;

  const Ment = styled.h1`
    margin-top: 30px;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #0288d1;
    text-align: center;
  `;

  const ChatComponentsTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 3rem 0 0 0;
    color: #333;
    text-align: center;
  `;

  return [
    Container,
    ChatContainer,
    InputContainer,
    ChatList,
    Ment,
    ChatComponentsTitle,
  ];
}
export default ChatComponents;
