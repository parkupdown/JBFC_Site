import styled from "styled-components";
import { FaInstagram } from "react-icons/fa6";
import { GrBlog } from "react-icons/gr";

export default function Footer() {
  return (
    <FooterStyled>
      <div className="title">
        <span>JJACKBALANCE</span>
        <span>
          instagram
          <FaInstagram />
        </span>
        <span>
          blog
          <GrBlog />
        </span>
      </div>
      <div className="summury">
        <span>회장: 박준명</span>
        <span>총무: 노재만</span>
        <span>천안: 전민욱</span>
        <span>contact 010-3445-5177</span>
      </div>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  /* width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;*/
  width: 70%;

  .title {
    display: flex;
    flex-direction: column;
    opacity: 0.7;
    background-color: ${({ theme }) => theme.backgroundColor.box};
    padding: 0px 10px;
    span {
      svg {
        margin-left: 3px;
      }
    }
  }
  .summury {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 10px;
    font-size: 13px;
    opacity: 0.7;
    span {
      background-color: ${({ theme }) => theme.backgroundColor.box};
      padding: 5px;
      border-radius: 5px;
    }
  }
`;
