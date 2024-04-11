import { formatMvpPlayer, formatOrderByScore } from "../../utils/format";
import { getNickName } from "@/store/nickNameStore";
import { httpClient } from "@/api/http";
import { queryClient } from "../../App";

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

  return (
    <>
      <h6>{voteData.length}명이 투표에 참여해주셨습니다.</h6>
      <>
        <span>평점: {maxScore}</span>
        <span>mvp: {mvpPlayer}</span>
      </>
      {playerData.map((player, index) => (
        <div key={index}>
          <span>{player.player}</span>
          <span>평점: {Math.ceil(player.score / voteCount)}</span>
        </div>
      ))}
      <button onClick={handleDelete}>다시 투표</button>
    </>
  );
}
