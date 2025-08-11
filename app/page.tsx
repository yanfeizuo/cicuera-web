'use client';

import { OpenLink } from '../index';

export default function DemoPage() {
  // const { isOpen, openModal, closeModal } = useModal();

  const handleSubmit = (status: boolean) => {
    console.log('status', status);
  };

  return (
    <div>
      
      <OpenLink
        onSubmit={handleSubmit}
      />
    </div>
  );
}