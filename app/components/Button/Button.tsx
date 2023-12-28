import classNames from 'classnames';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = {
  isDisabled?: boolean;
  className: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isDisabled = false,
  className,
  type = 'button',
  children,
  onClick,
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
    <div className="flex max-w-full grow justify-center">
      <span className="block w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-center transition-all duration-200">
        <div className="flex items-center justify-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-dark-100 w-5"
          >
            <path
              d="M15.248 1.089A15.431 15.431 0 0011.534 0a9.533 9.533 0 00-.476.921 14.505 14.505 0 00-4.12 0A9.582 9.582 0 006.461 0a15.54 15.54 0 00-3.717 1.091C.395 4.405-.242 7.636.076 10.821A15.269 15.269 0 004.631 13c.369-.473.695-.974.975-1.499a9.896 9.896 0 01-1.536-.699c.13-.089.255-.18.377-.27 1.424.639 2.979.97 4.553.97 1.574 0 3.129-.331 4.553-.97.123.096.25.188.377.27a9.94 9.94 0 01-1.54.7c.28.525.607 1.026.976 1.498a15.2 15.2 0 004.558-2.178c.373-3.693-.639-6.895-2.676-9.733zM6.01 8.862c-.888 0-1.621-.767-1.621-1.712 0-.944.708-1.718 1.618-1.718.91 0 1.638.774 1.623 1.718-.016.945-.715 1.712-1.62 1.712zm5.98 0c-.889 0-1.62-.767-1.62-1.712 0-.944.708-1.718 1.62-1.718.912 0 1.634.774 1.618 1.718-.015.945-.713 1.712-1.618 1.712z"
              fill="currentColor"
            ></path>
          </svg>
          {children || 'Submit'}
        </div>
      </span>
    </div>
  </button>
);

export default Button;
