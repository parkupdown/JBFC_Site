import styled from "styled-components";
import { ground, time } from "@/constants/scheduleForm.contants";
import { useForm } from "react-hook-form";
import { postScheduleData, updateScheduleData } from "@/api/schedule.api";

import { queryClient } from "@/App";
import { Error } from "@/components/common/Error";

export default function FormModal({ month, day, closeModal, isUpdate }) {
  // 여기서 제출하면 이제 구자 정보 등록

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ground: "청개구리",
      time: "18시-20시",
      playerOfNum: 12,
      playType: "자체",
      price: 120000,
    },
  });

  const onSubmit = async (data) => {
    const scheduleData = { month: month, day: day, ...data };
    !isUpdate && (await postScheduleData(scheduleData));
    isUpdate && (await updateScheduleData(scheduleData));
    queryClient.invalidateQueries(`${month}월`);
    queryClient.invalidateQueries(`${month}players`);
    queryClient.invalidateQueries(`${month}votes`);
    queryClient.invalidateQueries(`todaySchedule`);
    closeModal();
  };

  return (
    <>
      <InputContainer>
        <InputLabel>풋살장</InputLabel>
        <SelectField placeholder="대여 풋살장" {...register("ground")}>
          {ground.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </SelectField>
      </InputContainer>
      <InputContainer>
        <InputLabel>시간</InputLabel>
        <SelectField placeholder="대여 시간" {...register("time")}>
          {time.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </SelectField>
      </InputContainer>
      <InputContainer>
        <InputLabel>인원 수</InputLabel>
        <InputField
          placeholder="경기 인원"
          type="number"
          {...register("playerOfNum", {
            max: { value: 18, message: "최대 18명입니다." },
            min: { value: 1, message: "최소 1명입니다" },
          })}
        />
      </InputContainer>
      {errors && errors.playerOfNum && (
        <Error message={errors.playerOfNum.message} />
      )}
      <InputContainer>
        <InputLabel>자체/매칭</InputLabel>
        <SelectField {...register("playType")}>
          <option value="매칭">매칭</option>
          <option value="자체">자체</option>
        </SelectField>
      </InputContainer>

      <InputContainer>
        <InputLabel>결제금액</InputLabel>
        <InputField
          placeholder="후불결제시 0원 입력"
          type="number"
          {...register("price", {
            max: { value: 200000, message: "최대 20만원입니다." },
            min: { value: 0, message: "최소 0원 입니다." },
          })}
        />
      </InputContainer>
      {errors && errors.price && <Error message={errors.price.message} />}
      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        제출
      </Button>
    </>
  );
}

const InputContainer = styled.div`
  margin-bottom: 15px;
  margin-bottom: 5px;
`;

const InputLabel = styled.label`
  display: block;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  border: ${({ theme }) => theme.border.main};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.positiveClicked};
`;
const SelectField = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  border: ${({ theme }) => theme.border.main};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.positiveClicked};
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.color.positive};
  color: ${({ theme }) => theme.backgroundColor.main};
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.positive};
  }
`;
