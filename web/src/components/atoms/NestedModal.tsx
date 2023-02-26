import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';

interface IProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  hideTrigger?: boolean;
}

export const NestedModal: React.FC<IProps> = ({ children, isOpen, onClose = () => {}, hideTrigger }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (typeof isOpen === 'boolean') setOpen(isOpen);
  }, [isOpen]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      {!hideTrigger && <Button onClick={handleOpen}>Open modal</Button>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <>{children}</>
      </Modal>
    </div>
  );
};
