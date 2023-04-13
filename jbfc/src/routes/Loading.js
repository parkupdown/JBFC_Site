import React from "react";
import styled, { keyframes } from "styled-components";
import { GiSoccerKick } from "react-icons/gi";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 4.5rem;
  font-weight: bold;
  color: #3b5998;
  margin-right: 0.5rem;
`;

const Spinner = styled.div`
  border: 0.25rem solid rgba(59, 89, 152, 0.1);
  border-top-color: #3b5998;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  animation: ${rotate} 1s linear infinite;
  margin-left: 0.5rem;
`;

function Loading() {
  return (
    <LoadingContainer>
      <Logo>JJACK BALANCE</Logo>
      <Spinner>
        <GiSoccerKick />
      </Spinner>
    </LoadingContainer>
  );
}

export default Loading;
