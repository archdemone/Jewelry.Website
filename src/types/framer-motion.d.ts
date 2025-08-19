import { HTMLAttributes, ReactNode } from 'react';
import { MotionProps } from 'framer-motion';

declare module 'framer-motion' {
  interface HTMLMotionProps<T> extends HTMLAttributes<T>, MotionProps {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    id?: string;
  }
}

// Extend the motion components to accept HTML attributes
declare module 'framer-motion' {
  export interface MotionDivProps extends HTMLMotionProps<HTMLDivElement> {}
  export interface MotionButtonProps extends HTMLMotionProps<HTMLButtonElement> {}
  export interface MotionLinkProps extends HTMLMotionProps<HTMLAnchorElement> {}
  export interface MotionSpanProps extends HTMLMotionProps<HTMLSpanElement> {}
  export interface MotionImgProps extends HTMLMotionProps<HTMLImageElement> {}
  export interface MotionFormProps extends HTMLMotionProps<HTMLFormElement> {}
  export interface MotionInputProps extends HTMLMotionProps<HTMLInputElement> {}
  export interface MotionTextareaProps extends HTMLMotionProps<HTMLTextAreaElement> {}
  export interface MotionLabelProps extends HTMLMotionProps<HTMLLabelElement> {}
  export interface MotionSectionProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionArticleProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionHeaderProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionFooterProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionNavProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionMainProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionAsideProps extends HTMLMotionProps<HTMLElement> {}
  export interface MotionUlProps extends HTMLMotionProps<HTMLUListElement> {}
  export interface MotionLiProps extends HTMLMotionProps<HTMLLIElement> {}
  export interface MotionPProps extends HTMLMotionProps<HTMLParagraphElement> {}
  export interface MotionH1Props extends HTMLMotionProps<HTMLHeadingElement> {}
  export interface MotionH2Props extends HTMLMotionProps<HTMLHeadingElement> {}
  export interface MotionH3Props extends HTMLMotionProps<HTMLHeadingElement> {}
  export interface MotionH4Props extends HTMLMotionProps<HTMLHeadingElement> {}
  export interface MotionH5Props extends HTMLMotionProps<HTMLHeadingElement> {}
  export interface MotionH6Props extends HTMLMotionProps<HTMLHeadingElement> {}
}
