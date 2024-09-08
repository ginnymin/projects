'use client';

import { ComponentProps } from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({
  children,
  ...props
}: ComponentProps<typeof SWRConfig>) => (
  <SWRConfig {...props}>{children}</SWRConfig>
);
