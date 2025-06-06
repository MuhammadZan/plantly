import { Icon as Iconify } from "@iconify/react";
export const Search = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => <Icon icon="mynaui:search" className={className} onClick={onClick} />;
export const User = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => <Icon icon="solar:user-broken" className={className} onClick={onClick} />;
export const Favourit = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <Icon icon="solar:heart-broken" className={className} onClick={onClick} />
);
export const Logout = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <Icon icon="solar:logout-2-broken" className={className} onClick={onClick} />
);
export const Cart = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <Icon
    icon="solar:cart-large-2-broken"
    className={className}
    onClick={onClick}
  />
);
export const Chaveron = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <Icon icon="mingcute:down-fill" className={className} onClick={onClick} />
);
export const Leaf = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="52"
    viewBox="0 0 128 128"
  >
    <path
      fill="#015b07"
      d="M59.17 122.18c.2.99 1.31 1.87 4.39 2.07s5.15-.3 5.23-1.95c.09-1.65-1.14-3.49-1.34-4.88s-.99-10.74-1.19-15.61s-.36-14.16-.36-14.16l-4.07.43s.06 9.65-.14 14.52s-1.01 12.01-1.11 13.89c-.09 1.71-1.83 3.61-1.41 5.69"
    />
    <radialGradient
      id="notoMapleLeaf0"
      cx="65.418"
      cy="73.028"
      r="42.057"
      gradientTransform="matrix(.9999 .0135 -.0173 1.2815 1.27 -21.44)"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset=".596" stop-color="#00be58" />
      <stop offset="1" stop-color="#2c8700" />
    </radialGradient>
    <path
      fill="url(#notoMapleLeaf0)"
      d="M63.88 89.48s-5.57 6.36-9.55 8.75s-9.55 5.27-10.54 4.57s1.39-5.57 1.39-5.57s-8.32 1.88-17.53-.79c-8.82-2.55-14.09-6.37-13.69-7.47s4.57-1.69 8.65-3.28s9.55-4.18 9.55-4.18s-7.83-2.84-12.3-5.62s-7.29-5.41-7.39-6.31c-.1-.89 6.26-2.49 6.26-2.49s-3.48-2.39-6.07-10.14s-3.27-13.63-2.78-14.21c1.18-1.37 11.73 2.28 14.72 3.85c2.88 1.51 7.55 4.5 7.55 4.5s-.3-5.97.7-5.97c.99 0 3.58 2.39 5.87 5.37s9.05 13.32 10.74 12.53c1.69-.8.09-5.78-2.28-10.67c-1.49-3.08-3.59-8.23-4.78-14.29c-1.18-6-.5-10.94.2-11.53c.7-.6 7.46 4.67 7.46 4.67s-.54-5.79.55-10.76s2.03-6.46 2.62-6.56c.6-.1 2.99 3.4 2.99 3.4s.92-4.95 2.91-8.43s3.75-5.09 4.64-5.09s3.52 3.49 4.71 7.17s1.88 6.73 1.88 6.73s1.51-3.09 2.18-3.2c.57-.09 2.58 2.16 3.57 7.43s.99 8.91.99 8.91s4.28-4.47 5.07-4.57c.8-.1 2.79 5.07 1.3 12.13S78.1 52.24 77.2 55.92c-.89 3.68-1.69 7.29-.2 7.69s3-4.1 6.18-9.08s7.54-10.21 8.14-9.82c.6.4 1.49 2.29 1.69 3.28s.3 2.88.3 2.88s4.57-3.08 8.55-4.57s12.93-4.77 14.82-3.18s-1.49 10.14-3.48 14.52s-6.36 10.93-6.36 10.93s5.95 1.14 5.85 2.03s-4.95 4.89-9.33 7.18s-9.96 4.13-9.96 4.13s2.49 1.69 8.35 3.58c5.87 1.89 10.74 2.49 11.14 3.48s-2.29 4.47-11.24 6.86s-18.93 1.06-19.43 1.55c-.5.5 2.43 4.41 1.63 5.51s-6.17-.42-10.34-3.98c-5.35-4.56-9.63-9.43-9.63-9.43"
    />
    <path
      fill="#006715"
      d="M63.97 91.94s1.82-1.4 5.59-2.16c2.07-.42 4.88-.47 7.95-.4c8.24.17 17.03 1.71 21.65 1.87c4.62.15 8.86 0 8.78-1s-7.16-.54-12.55-1.54s-13.17-2.08-16.41-2.23c-8.37-.41-10.09.77-10.09.77s10.78-9.55 14.79-12.63s10.47-8.12 16.41-13.4c5.17-4.6 14.63-14.33 14.02-15.17c-.62-.85-12.25 10.24-16.48 13.63c-4.24 3.39-9.85 7.6-18.55 14.46S65.74 85.49 65.74 85.49s-.69-25.8-.92-31.89c-.23-6.08-.23-28.87-.39-31.64s.39-14.26-1-14.19c-1.39.08-1.62 9.4-1.77 14.1s-.15 24.49-.31 30.58s.23 32.73.23 32.73s-16.56-12.46-22.72-17.39S22.39 53.61 21 52.45s-6.71-6.11-7.33-5.49s7.17 8.88 10.1 11.5s16.15 14.09 21.85 18.78s12.88 9.92 12.88 9.92s-6.78-.77-15.92.05c-6.93.62-13.43 1.42-16.28 1.65s-7.24.31-7.39.92c-.15.62 3.54 1.54 10.94 1.08c7.39-.46 11.26-.79 16.64-1.05c7.32-.35 12.02-.1 13.86.36c1.85.46 3.62 1.77 3.62 1.77"
    />
  </svg>
);
export const Icon = ({
  icon,
  className,
  onClick,
}: {
  icon: string;
  className?: string;
  onClick?: () => void;
}) => (
  <Iconify
    onClick={onClick}
    icon={icon}
    className={`transition-all hover:text-primary h-6 w-6 cursor-pointer ${className}`}
  />
);
