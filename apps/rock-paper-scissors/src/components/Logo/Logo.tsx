import type { FC, PropsWithChildren } from 'react';

import styles from './Logo.module.scss';

type Props = {
  property?: string;
};

export const Logo: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className={styles.className}>{children}</div>;
};
