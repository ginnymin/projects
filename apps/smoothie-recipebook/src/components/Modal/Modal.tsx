import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogProps,
  Transition,
} from '@headlessui/react';

export const Modal = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props} className="relative">
      <DialogBackdrop
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Transition appear show>
          <DialogPanel
            transition
            className="min-w-80 mx-auto bg-white p-8 rounded-lg w-full h-full sm:w-fit sm:h-fit transition duration-500 ease-out data-[closed]:opacity-0 max-h-screen overflow-y-auto"
          >
            {children}
          </DialogPanel>
        </Transition>
      </div>
    </Dialog>
  );
};
