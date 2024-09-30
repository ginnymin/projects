import clsx from 'clsx';
import type { FC, HTMLAttributes } from 'react';

import styles from './Skeleton.module.scss';

type Props = HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<Props> = ({ className }) => {
  return <div className={clsx('rounded-md', styles.skeleton, className)} />;
};
