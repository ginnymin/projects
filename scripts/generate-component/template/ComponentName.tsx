import type { FC, PropsWithChildren } from 'react';

import styles from './ComponentName.module.scss';

type Props = {
  property?: string;
};

export const ComponentName: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className={styles.className}>{children}</div>;
};
