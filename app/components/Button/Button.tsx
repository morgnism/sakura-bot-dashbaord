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
    className={className}
    disabled={isDisabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
