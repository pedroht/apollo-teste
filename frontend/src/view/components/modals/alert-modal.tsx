'use client';

import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  loading: boolean;
}

export function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="This actions cannot be undone."
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
