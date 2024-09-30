import clsx from 'clsx';
import type { ElementType, FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

export const Grid: FC<Props> = ({ as = 'ul', children, className }) => {
  const Element = as;

  return (
    <Element
      className={clsx(
        'grid gap-5 grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]',
        className
      )}
      role="grid"
    >
      {children}
    </Element>
  );
};
