import { HTMLAttributes, ReactNode } from 'react';

// Extend the global JSX namespace to add motion component types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add motion elements with proper HTML attributes
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
      };
      'motion.input': HTMLAttributes<HTMLInputElement> & {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
      };
      'motion.textarea': HTMLAttributes<HTMLTextAreaElement> & {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
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
      };
      'motion.img': HTMLAttributes<HTMLImageElement> & {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
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
