"use client";

import { Modal } from "@components/Modal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Modal open={true} onClose={onDismiss}>
      {children}
    </Modal>
  );
};

export default ModalLayout;
