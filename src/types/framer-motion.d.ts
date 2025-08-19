import { HTMLAttributes, ReactNode } from 'react';

// Extend Framer Motion types to include HTML attributes
declare module 'framer-motion' {
  interface HTMLMotionProps<T> extends HTMLAttributes<T> {
    children?: ReactNode;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: (event?: any) => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    id?: string;
    style?: React.CSSProperties;
    title?: string;
    role?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean;
    tabIndex?: number;
  }

  export interface MotionProps {
    children?: ReactNode;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: (event?: any) => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    id?: string;
    style?: React.CSSProperties;
    title?: string;
    role?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean;
    tabIndex?: number;
    className?: string;
  }
}

// Also extend the global JSX namespace as a fallback
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'motion.div': HTMLAttributes<HTMLDivElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        onClick?: () => void;
        href?: string;
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
        id?: string;
        style?: React.CSSProperties;
        title?: string;
        role?: string;
        'aria-label'?: string;
        'aria-describedby'?: string;
        'aria-hidden'?: boolean;
        tabIndex?: number;
        className?: string;
      };
      'motion.button': HTMLAttributes<HTMLButtonElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        onClick?: () => void;
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
        className?: string;
      };
      'motion.a': HTMLAttributes<HTMLAnchorElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        href?: string;
        onClick?: () => void;
        className?: string;
      };
      'motion.section': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.article': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.header': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.footer': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.nav': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.main': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.aside': HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.form': HTMLAttributes<HTMLFormElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.input': HTMLAttributes<HTMLInputElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.label': HTMLAttributes<HTMLLabelElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.textarea': HTMLAttributes<HTMLTextAreaElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.select': HTMLAttributes<HTMLSelectElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.option': HTMLAttributes<HTMLOptionElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.table': HTMLAttributes<HTMLTableElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.thead': HTMLAttributes<HTMLTableSectionElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.tbody': HTMLAttributes<HTMLTableSectionElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.tr': HTMLAttributes<HTMLTableRowElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.th': HTMLAttributes<HTMLTableCellElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.td': HTMLAttributes<HTMLTableCellElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.span': HTMLAttributes<HTMLSpanElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h1': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h2': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h3': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h4': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h5': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.h6': HTMLAttributes<HTMLHeadingElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.p': HTMLAttributes<HTMLParagraphElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.ul': HTMLAttributes<HTMLUListElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.li': HTMLAttributes<HTMLLIElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
      };
      'motion.img': HTMLAttributes<HTMLImageElement> & {
        children?: ReactNode;
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
        className?: string;
        src?: string;
        alt?: string;
      };
    }
  }
}

// Also extend the Window interface for workbox
declare global {
  interface Window {
    workbox?: any;
  }
}
