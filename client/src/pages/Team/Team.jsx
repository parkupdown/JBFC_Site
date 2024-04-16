import styled from "styled-components";
import { players } from "../../constants/player.constant";

export default function Team() {
  return (
    <Container>
      {players.map((player) => (
        <div className="playerInfo">
          <div className="imgBox">
            <img src={player.imgSrc} />
          </div>
          <div className="textBox">
            <span className="name">{player.name}</span>
            <span className="position">{player.position}</span>
            <div className="characterBox">
              {player.character.map((character) => (
                <span>{character}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}

/**
        <img src={`/Player/${index + 1}.png`} />
 */
const Container = styled.div`
  height: auto;
  width: 100vw;
  display: grid;
  place-items: center;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-template-columns: repeat(4, 1fr);

  .playerInfo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20vw;
    height: 20vh;
    background-color: ${({ theme }) => theme.backgroundColor.box};
    padding: 5px 10px;
    margin-bottom: 10px;
    border-radius: 10px;

    @media (max-width: 800px) {
      width: 40vw;
    }
    .imgBox {
      img {
        width: 100px;
        @media (max-width: 800px) {
          width: 70px;
        }
      }
    }
    .textBox {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: 500;
        font-size: 20px;
      }
      .position {
        font-size: 11px;
        opacity: 0.7;
        font-family: 200;
      }
    }
    .characterBox {
      span {
        border: ${({ theme }) => theme.border.main};
        padding: 1px;
        border-radius: 2px;
        font-size: 12px;
        color: ${({ theme }) => theme.color.positive};
        background-color: ${({ theme }) => theme.backgroundColor.main};
        margin-right: 2px;
        @media (max-width: 800px) {
          font-size: 7px;
        }
      }
    }
  }
`;
