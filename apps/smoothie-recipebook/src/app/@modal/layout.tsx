'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Modal } from '@components/Modal';

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
