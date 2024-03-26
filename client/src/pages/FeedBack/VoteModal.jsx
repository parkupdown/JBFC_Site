import { useForm } from "react-hook-form";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { getNickName } from "../../store/nickNameStore";
import { httpClient } from "../../api/http";
import { QueryClient, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function VoteModal({ closeModal, playerData, scheduleId }) {
  const nickName = getNickName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scoreArr = Array.from({ length: 6 }, (_, i) => i * 2);

  const insertVoteData = async (voteResult) => {
    await httpClient.post(`/vote`, {
      schedule_id: scheduleId,
      nickName: nickName,
      voteResult: voteResult,
    });
  };
  // 투표넣었음
  // 이제 점수더하기

  const updateVoteScore = async (voteResult) => {
    await httpClient.put("/player", {
      schedule_id: scheduleId,
      voteResult: voteResult,
    });
  };

  const onSubmit = async (voteResult) => {
    console.log(voteResult);
    await insertVoteData(voteResult);
    await updateVoteScore(voteResult);
    closeModal();
  };

  // 여기서 Player table에 점수부분에 더하고
  // vote에 투표했음을 표시

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {playerData &&
          playerData.map((player, playerIndex) => (
            <div key={playerIndex} className="scoreBox mb-3">
              <span>{player.player}</span>
              <div className="d-flex">
                {scoreArr.map((score, scoreIndex) => (
                  <div
                    className="form-check form-check-inline"
                    key={scoreIndex}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      {...register(player.player, {
                        required: true,
                      })}
                      value={score}
                    />
                    <label className="form-check-label">{score}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <Button type="submit">제출</Button>
      </form>
      <p>
        모든 선수의 점수를 체크해주세요. 중복으로 입력된 선수가 있을 수
        있습니다.
      </p>
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
`;

const ModalContent = styled.div`
  height: 60vh;
  background-color: white;
  padding: 40px;
  border-radius: 5px;
  position: relative;
  overflow-y: scroll;

  h6 {
    margin: 20px 0;
    width: 100%;
    text-align: center;
    opacity: 0.3;
  }

  .scoreBox {
    display: flex;
    flex-direction: column;
  }
  .innerScoreBox {
    background-color: aliceblue;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
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
