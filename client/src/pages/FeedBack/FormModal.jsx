import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { httpClient } from "@/api/http";
import { useForm } from "react-hook-form";
import { queryClient } from "../../App";

export default function FormModal({
  closeModal,
  scheduleId,
  playerNum,
  month,
}) {
  const playerArr = Array.from({ length: playerNum });

  const insertPlayerData = async (playerNames) => {
    httpClient.post("/player", {
      playerNames: playerNames,
      schedule_id: scheduleId,
    });
    queryClient.invalidateQueries(`${month}players`);
  };

  const onSubmit = async (data) => {
    insertPlayerData(data);
    closeModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {playerArr.map((player, index) => (
        <InputContainer key={index}>
          <InputLabel>player {index + 1}</InputLabel>
          <InputField
            placeholder="참여한 선수를 입력해주세요"
            type="text"
            {...register(`player${index}`, {
              required: "작성하지 않은 선수 이름이 있습니다.",
              maxLength: {
                value: 10,
                message: "최대 10글자까지 입력가능합니다.",
              },
            })}
          />
        </InputContainer>
      ))}
      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        제출
      </Button>
    </>
  );
}
//동일한 이름 안받아야함

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
