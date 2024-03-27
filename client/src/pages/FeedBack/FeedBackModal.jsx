import { httpClient } from "../../api/http";
import { useState } from "react";
import { useEffect } from "react";
import FormModal from "./FormModal";
import VoteModal from "./VoteModal";
import FeedBackResult from "./FeedBackResult";
import styled from "styled-components";
import Modal from "../../components/common/Modal";

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
      <Modal closeModal={closeModal}>
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
      </Modal>
    </div>
  );
}
