import {
  formatAverageScore,
  formatMvpPlayer,
  formatOrderByScore,
} from "../../utils/format";
import { getNickName } from "@/store/nickNameStore";
import { httpClient } from "@/api/http";
import { queryClient } from "../../App";
import styled from "styled-components";

export default function FeedBackResult({
  closeModal,
  scheduleId,
  playerData,
  voteData,
  month,
}) {
  const nickName = getNickName();

  const deleteVote = async () => {
    await httpClient.delete(
      `/vote?schedule_id=${scheduleId}&nickName=${nickName}`
    );
  };
  //+ 점수도 reset되게
  const deleteScore = async () => {
    await httpClient.put(`/player/cancel`, {
      schedule_id: scheduleId,
      voter: nickName,
    });
  };

  const handleDelete = async () => {
    await deleteScore();
    await deleteVote();
    queryClient.invalidateQueries(`${month}players`);
    queryClient.invalidateQueries(`${month}votes`);

    closeModal();
  };

  // 캐싱 데이터를 기준으로 가져올까
  playerData = formatOrderByScore(playerData);
  let voteCount = voteData.length;
  let { maxScore, mvpPlayer } = formatMvpPlayer(playerData, voteCount);
  let averageScore = formatAverageScore(playerData);

  return (
    <Container>
      <div className="mvpBox">
        <span className="mvp">MVP: </span>
        <span className="mvpP">{mvpPlayer}</span>
      </div>
      <div className="header">
        <div className="summaryResultBox">
          <span>Max rating:</span>
          <span className="score">{maxScore}</span>
        </div>
        <div className="summaryResultBox">
          <span>Average rating:</span>
          <span className="score">{averageScore}</span>
        </div>
        <div className="summaryResultBox">
          <span>Total votes:</span>
          <span className="score">{voteCount}</span>
        </div>
      </div>
      <div className="standard">
        <span className="player">선수</span>
        <span className="score">점수</span>
      </div>
      <div className="contents">
        {playerData.map((player, index) => (
          <div className="playerScoreBox" key={index}>
            <span className="player">{player.player}</span>
            <span className="score">{Math.ceil(player.score / voteCount)}</span>
          </div>
        ))}
      </div>

      <button onClick={handleDelete}>다시 투표</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  .mvpBox {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: ${({ theme }) => theme.backgroundColor.box};
    border: ${({ theme }) => theme.border.main};
    border-radius: 10px;
  }
  .mvp {
    font-size: 11px;
    opacity: 0.7;
  }
  .mvpP {
    font-size: 20px;
    font-weight: 600;
  }
  .header {
    display: flex;
    font-size: 11px;
    opacity: 0.7;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .summaryResultBox {
      margin: 0 2px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 16px;
      background-color: ${({ theme }) => theme.backgroundColor.box};
      border: ${({ theme }) => theme.border.main};
      border-radius: 10px;
      .score {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .standard {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    span {
      background-color: ${({ theme }) => theme.backgroundColor.main};
      padding: 5px 10px;
      color: ${({ theme }) => theme.color.positive};
      border: ${({ theme }) => theme.border.main};
      border-radius: 10px;
      opacity: 0.7;
    }
  }
  .contents {
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColor.input};
    padding: 20px;
    border-radius: 20px;
    .playerScoreBox {
      display: flex;
      justify-content: space-around;
      .player {
        font-size: 12px;
        opacity: 0.7;
      }
      .score {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  button {
    margin-top: 20px;
    background-color: ${({ theme }) => theme.backgroundColor.main};
    border: ${({ theme }) => theme.border.main};
    border-radius: 10px;
    padding: 5px;
    color: ${({ theme }) => theme.color.negative};
    font-size: 16px;
    font-weight: 200;
  }
`;
