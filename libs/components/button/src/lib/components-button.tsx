import Link from 'next/link';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

import styles from './components-button.module.scss';

interface ComponentsButtonProps {
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  link?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: boolean;
  type?: 'submit';
}

export const ComponentsButton = ({
  children,
  color = 'primary',
  disabled = false,
  link,
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  rounded = false,
  type,
}: PropsWithChildren<ComponentsButtonProps>) => {
  const button = (
    <button
      className={`
      relative
      ${styles.btn}
      ${styles[`btn-${color}`]}
      ${rounded ? styles['btn-rounded'] : ''}
      ${loading ? styles['btn-loading'] : ''}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      <span> {children}</span>
    </button>
  );
  if (link) {
    return (
      <Link href={link}>
        <a>{button}</a>
      </Link>
    );
  }
  return button;
};
