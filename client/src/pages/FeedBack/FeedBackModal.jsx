import { httpClient } from "../../api/http";
import { useState } from "react";
import { useEffect } from "react";
import FormModal from "./FormModal";
import VoteModal from "./VoteModal";
import FeedBackResult from "./FeedBackResult";
import styled from "styled-components";

// 일단 여기로 들어와서 만약 아직 생성된 투표가 없다면 ? 으로가는걸로
// eslint-disable-next-line react/prop-types
export default function FeedBackModal({
  scheduleId,
  closeModal,
  playerNum,
  isOpenModal,
}) {
  const [playerData, setPlayerData] = useState([]);
  const [voteData, setVoteData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlayerData = async () => {
    const response = await httpClient.get(`/player/${scheduleId}`);
    return response.data;
  };
  const getVoteUserData = async () => {
    const response = await httpClient.get(`/vote/${scheduleId}`);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const playerResponse = await getPlayerData();
      const voteResponse = await getVoteUserData();
      setPlayerData(playerResponse);
      setVoteData(voteResponse);
      setLoading(false);
    };

    fetchData();
  }, [isOpenModal]);

  return (
    <div>
      {loading && <h4>로딩중</h4>}
      <ModalBackground>
        <ModalContent>
          {!loading && playerData.length === 0 && (
            <FormModal
              closeModal={closeModal}
              scheduleId={scheduleId}
              playerNum={playerNum}
            />
          )}
          {!loading && playerData.length !== 0 && voteData.length === 0 && (
            <VoteModal
              closeModal={closeModal}
              playerData={playerData}
              scheduleId={scheduleId}
            />
          )}
          {!loading && playerData.length !== 0 && voteData.length !== 0 && (
            <FeedBackResult
              closeModal={closeModal}
              scheduleId={scheduleId}
              playerData={playerData}
              voteData={voteData}
            />
          )}
          <CancelButton onClick={closeModal}>X</CancelButton>
        </ModalContent>
      </ModalBackground>
    </div>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1;
`;

const ModalContent = styled.div`
  height: 60vh;
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  position: relative;
  overflow-y: scroll;
`;
const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const CancelButton = styled(Button)`
  background-color: red;
  position: absolute;
  top: 5px;
  left: 5px;
  &:hover {
    background-color: #a50303;
  }
`;
/**
 * 
 *  data.length === 0 ? (
        <FormModal
          closeModal={closeModal}
          scheduleId={scheduleId}
          playerNum={playerNum}
        />
      ) : isVoted ? (
        <FeedBackResult scheduleId={scheduleId} />
      ) : (
        <VoteModal
          closeModal={closeModal}
          playerData={data}
          scheduleId={scheduleId}
        />
      )
 */
