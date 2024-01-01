import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonProps = {
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isDisabled = false,
  className,
  type,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={className}
    disabled={isDisabled}
    onClick={onClick}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
