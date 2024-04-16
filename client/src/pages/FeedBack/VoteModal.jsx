import { useForm } from "react-hook-form";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { getNickName } from "@/store/nickNameStore";
import { httpClient } from "@/api/http";
import { queryClient } from "@/App";

export default function VoteModal({
  closeModal,
  playerData,
  scheduleId,
  month,
}) {
  const nickName = getNickName();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
    await insertVoteData(voteResult);
    await updateVoteScore(voteResult);
    queryClient.invalidateQueries(`${month}votes`);
    queryClient.invalidateQueries(`${month}players`);

    closeModal();
  };

  // 여기서 Player table에 점수부분에 더하고
  // vote에 투표했음을 표시

  return (
    <Container>
      <span className="header">Praise makes the whale dance</span>
      <div className="formBox">
        <form onSubmit={handleSubmit(onSubmit)}>
          {playerData &&
            playerData.map((player, playerIndex) => (
              <div key={playerIndex} className="voteBox">
                <span>{player.player}</span>
                <div className="radioBox">
                  {scoreArr.map((score, scoreIndex) => (
                    <div key={scoreIndex}>
                      <label
                        htmlFor={`player${player.player}${scoreIndex}`}
                        value={score}
                        className="radioButton"
                        style={{
                          backgroundColor:
                            watch(player.player) == score
                              ? "#516fd4"
                              : "#edb87b",
                        }}
                      >
                        {score}
                        <input
                          className="radioButtonHidden"
                          id={`player${player.player}${scoreIndex}`}
                          type="radio"
                          {...register(player.player, {
                            required: true,
                          })}
                          value={score}
                          name={player.player}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <Button type="submit">제출</Button>
        </form>
        {errors && <span>투표하지 않은 선수가 존재합니다.</span>}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .header {
    padding: 5px 14px;
    background-color: ${({ theme }) => theme.backgroundColor.box};
    border-radius: 10px;
    border: ${({ theme }) => theme.border.main};
    font-size: 15px;
    opacity: 0.7;
    font-weight: 300;
  }

  .formBox {
    width: 50vw;
    @media (max-width: 800px) {
      width: 100vw;
    }
    margin-top: 20px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.backgroundColor.box};
  }

  .voteBox {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 30px;

    span {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.7;
      background-color: ${({ theme }) => theme.backgroundColor.main};
      padding: 0px 20px;
      border-radius: 10px;
      border: ${({ theme }) => theme.border.main};
    }
    .radioBox {
      display: flex;
    }
  }

  .radioButtonHidden {
    display: none;
  }

  .radioButton {
    font-size: 12px;
    padding: 3px 10px;
    color: white;
    margin: 0 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
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
