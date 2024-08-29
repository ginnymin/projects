import type { FC, HTMLAttributes } from 'react';

import styles from './ComponentName.module.scss';

type Props = HTMLAttributes<HTMLElement> & {
  property?: string;
};

export const ComponentName: FC<Props> = ({ children }) => {
  return <div className={styles.className}>{children}</div>;
};
