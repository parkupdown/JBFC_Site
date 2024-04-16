import { useState } from "react";
import Modal from "@/components/common/Modal";
import { useScheduleDetail } from "@/hooks/useScheduleDetail";
import FormModal from "./FormModal";
import ResultModal from "./ResultModal";

export default function ScheduleModal({ closeModal, month, day }) {
  const { scheduleDetail } = useScheduleDetail(month, day);

  // 잘 불어와지네

  return (
    <>
      <Modal closeModal={closeModal}>
        {scheduleDetail.length === 0 && (
          <FormModal
            month={month}
            day={day}
            closeModal={closeModal}
            isUpdate={false}
          />
        )}
        {scheduleDetail.length !== 0 && (
          <ResultModal
            scheduleDetailData={scheduleDetail}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
