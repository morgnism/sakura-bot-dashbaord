import classNames from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonProps = {
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isDisabled = false,
  className,
  type = 'button',
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={classNames([
      'relative mx-auto flex w-full shrink-0 items-center gap-1.5 overflow-hidden rounded-lg px-4 py-2 text-base transition-all duration-200 active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 md:mx-0 md:w-auto',
      className,
    ])}
    disabled={isDisabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
