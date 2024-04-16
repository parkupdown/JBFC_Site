import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "@/api/http";
import { getNickName } from "@/store/nickNameStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { queryClient } from "../../App";

export default function BoardWrite() {
  const nickName = getNickName();
  const navigator = useNavigate();
  let [imageFile, setImageFile] = useState(null);
  let [thumbnail, setThumbnail] = useState(null);

  const getPublishedTime = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    return `${year}년 ${month}월 ${day}일`;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnail(reader.result);
      };
    }
  };

  const insertBoardData = async (formData) => {
    const response = await httpClient.post("/board", formData, {
      headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
    });
    return response.data;
  };

  const isLastPage = (lastPageBoardData) => {
    if (lastPageBoardData === undefined) {
      return true;
    }
    return false;
  };

  const mutaion = useMutation((formData) => insertBoardData(formData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("lastestBoardData");
      queryClient.invalidateQueries("myBoardData");

      queryClient.setQueryData("boardData", (prev) => {
        // 가장 마지막 Page에 load된 prev의 data의 마지막 id가 1차이가 난다면? 추가해주기
        let prevBoardData = prev.pages;
        let lastPageBoardData = prevBoardData[prevBoardData.length - 1];
        if (isLastPage(lastPageBoardData)) {
          if (prevBoardData[prevBoardData.length - 2].length === 6) {
            prevBoardData[prevBoardData.length - 1] = [data];
            return { pages: prevBoardData };
          }
          if (prevBoardData[prevBoardData.length - 2].length !== 6) {
            prevBoardData[prevBoardData.length - 2].push(data);
            return { pages: prevBoardData };
          }
        }
        return { pages: prevBoardData };
        // lastPage가 아니면 수정으로 캐싱데이터 변경하지 않아도됨
      });
    },
  });
  // 근데 이렇게 하면 제출하고 나서 캐싱 데이터가 완전히 수정됨

  const deleteThumbnail = () => {
    setThumbnail(null);
    setImageFile(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { title, content } = data;
    let formData = new FormData();
    formData.append("image", imageFile);
    formData.append("nickname", nickName);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("time", getPublishedTime());
    mutaion.mutate(formData);
    navigator("/board");
  };

  return (
    <Container>
      <Form>
        <Input
          type="text"
          placeholder="제목"
          {...register("title", {
            maxLength: { value: 10, message: "제목은 10글자까지 가능합니다." },
            required: "제목을 입력해주세요.",
          })}
        />
        <ErrorMessage>{errors.title && errors.title.message}</ErrorMessage>

        <Textarea
          cols="40"
          rows="10"
          {...register("content", {
            maxLength: {
              value: 200,
              message: "최대 200글자 입력 가능합니다.",
            },
            required: "본문 내용을 입력해주세요.",
          })}
        ></Textarea>
        <ErrorMessage>{errors.content && errors.content.message}</ErrorMessage>

        {thumbnail === null ? null : (
          <ImageBox>
            <Image src={thumbnail} />
          </ImageBox>
        )}
        <label htmlFor="file">
          <div className="btn-upload">파일 업로드하기</div>
        </label>
        <input
          className="noneView"
          type="file"
          name="file"
          id="file"
          onChange={(e) => handleChange(e)}
          accept="image/*"
        />
      </Form>
      <div className="buttonBox">
        <DeleteButton type="button" onClick={deleteThumbnail}>
          파일삭제
        </DeleteButton>
        <Button
          className="upload"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          등록
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  .noneView {
    display: none;
  }
  .btn-upload {
    background-color: #fbfcff;
    width: max-content;
    border-radius: 10px;
    border: 0.5px solid #eeeeee;
    color: #516fd4;
    padding: 10px 20px;
    font-size: 14px;
  }

  .buttonBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: ${({ theme }) => theme.border.main};
  border-radius: 4px;
  width: 50%;
  height: 7vh;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.box};
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: ${({ theme }) => theme.border.main};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.box};
  width: 100%;
  height: 40vh;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ImageBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 40%;
`;

const Button = styled.button`
  padding: 10px 20px;
  text-align: center;
  width: 200px;
  border: ${({ theme }) => theme.border.main};
  background-color: ${({ theme }) => theme.backgroundColor.box};
  color: ${({ theme }) => theme.color.positive};
  border-radius: 10px;
  margin-top: 20px;
`;

const DeleteButton = styled(Button)`
  color: ${({ theme }) => theme.color.negative};
`;
