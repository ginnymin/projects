import {
  CloseButton as CloseButtonComponent,
  CloseButtonProps,
} from '@headlessui/react';
import Image from 'next/image';

import IconX from './icon-close.svg';

type Props = CloseButtonProps & {
  iconAlt?: string;
};

export const CloseButton = ({ className, iconAlt, ...props }: Props) => {
  return (
    <CloseButtonComponent {...props} className={className}>
      <Image src={IconX} alt={iconAlt ?? 'Close'} />
    </CloseButtonComponent>
  );
};
