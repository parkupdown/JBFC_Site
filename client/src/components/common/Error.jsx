import styled from "styled-components";

export function Error({ message }) {
  return (
    <>
      <StyledError>{message}</StyledError>
    </>
  );
}

const StyledError = styled.span`
  font-size: 12px;
  color: red;
  opacity: 0.7;
`;
