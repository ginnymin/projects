import {
  CloseButton as CloseButtonComponent,
  CloseButtonProps,
} from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

type Props = CloseButtonProps & {
  iconAlt?: string;
};

export const CloseButton = ({ className, ...props }: Props) => {
  return (
    <CloseButtonComponent {...props} className={className}>
      <AiOutlineClose className="size-6" />
      <span className="sr-only">Close</span>
    </CloseButtonComponent>
  );
};
