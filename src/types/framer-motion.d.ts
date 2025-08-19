import React, { HTMLAttributes, ReactNode } from 'react';

// Extend Framer Motion module to include all HTML attributes
declare module 'framer-motion' {
  interface MotionProps {
    className?: string;
    onClick?: (event?: any) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    href?: string;
    style?: React.CSSProperties;
    title?: string;
    role?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-hidden'?: boolean;
    tabIndex?: number;
  }
}

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
      'motion.ol': HTMLAttributes<HTMLOListElement> & {
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
      'motion.video': HTMLAttributes<HTMLVideoElement> & {
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
      'motion.audio': HTMLAttributes<HTMLAudioElement> & {
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
      'motion.canvas': HTMLAttributes<HTMLCanvasElement> & {
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
      'motion.svg': HTMLAttributes<SVGElement> & {
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
      'motion.path': HTMLAttributes<SVGPathElement> & {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
      };
      'motion.circle': HTMLAttributes<SVGCircleElement> & {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        whileHover?: any;
        whileTap?: any;
        whileInView?: any;
        viewport?: any;
      };
      'motion.rect': HTMLAttributes<SVGRectElement> & {
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
        onClick?: (event?: any) => void;
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
        onClick?: (event?: any) => void;
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
      'motion.ol': HTMLAttributes<HTMLOListElement> & {
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
      'motion.img': HTMLAttributes<HTMLImageElement> & {
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
      'motion.video': HTMLAttributes<HTMLVideoElement> & {
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
      'motion.audio': HTMLAttributes<HTMLAudioElement> & {
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
      'motion.iframe': HTMLAttributes<HTMLIFrameElement> & {
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
      'motion.canvas': HTMLAttributes<HTMLCanvasElement> & {
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
      'motion.svg': HTMLAttributes<SVGElement> & {
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
      'motion.path': HTMLAttributes<SVGPathElement> & {
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
      'motion.circle': HTMLAttributes<SVGCircleElement> & {
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
      'motion.rect': HTMLAttributes<SVGRectElement> & {
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
      'motion.line': HTMLAttributes<SVGLineElement> & {
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
      'motion.polygon': HTMLAttributes<SVGPolygonElement> & {
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
      'motion.polyline': HTMLAttributes<SVGPolylineElement> & {
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
      'motion.ellipse': HTMLAttributes<SVGEllipseElement> & {
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
      'motion.g': HTMLAttributes<SVGGElement> & {
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
      'motion.text': HTMLAttributes<SVGTextElement> & {
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
      'motion.tspan': HTMLAttributes<SVGTSpanElement> & {
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
      'motion.defs': HTMLAttributes<SVGDefsElement> & {
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
      'motion.clipPath': HTMLAttributes<SVGClipPathElement> & {
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
      'motion.linearGradient': HTMLAttributes<SVGLinearGradientElement> & {
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
      'motion.radialGradient': HTMLAttributes<SVGRadialGradientElement> & {
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
      'motion.stop': HTMLAttributes<SVGStopElement> & {
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
      'motion.feBlend': HTMLAttributes<SVGFEBlendElement> & {
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
      'motion.feColorMatrix': HTMLAttributes<SVGFEColorMatrixElement> & {
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
      'motion.feComponentTransfer': HTMLAttributes<SVGFEComponentTransferElement> & {
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
      'motion.feComposite': HTMLAttributes<SVGFECompositeElement> & {
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
      'motion.feConvolveMatrix': HTMLAttributes<SVGFEConvolveMatrixElement> & {
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
      'motion.feDiffuseLighting': HTMLAttributes<SVGFEDiffuseLightingElement> & {
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
      'motion.feDisplacementMap': HTMLAttributes<SVGFEDisplacementMapElement> & {
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
      'motion.feDistantLight': HTMLAttributes<SVGFEDistantLightElement> & {
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
      'motion.feDropShadow': HTMLAttributes<SVGFEDropShadowElement> & {
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
      'motion.feFlood': HTMLAttributes<SVGFEFloodElement> & {
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
      'motion.feFuncA': HTMLAttributes<SVGFEFuncAElement> & {
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
      'motion.feFuncB': HTMLAttributes<SVGFEFuncBElement> & {
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
      'motion.feFuncG': HTMLAttributes<SVGFEFuncGElement> & {
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
      'motion.feFuncR': HTMLAttributes<SVGFEFuncRElement> & {
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
      'motion.feGaussianBlur': HTMLAttributes<SVGFEGaussianBlurElement> & {
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
      'motion.feImage': HTMLAttributes<SVGFEImageElement> & {
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
      'motion.feMerge': HTMLAttributes<SVGFEMergeElement> & {
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
      'motion.feMergeNode': HTMLAttributes<SVGFEMergeNodeElement> & {
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
      'motion.feMorphology': HTMLAttributes<SVGFEMorphologyElement> & {
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
      'motion.feOffset': HTMLAttributes<SVGFEOffsetElement> & {
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
      'motion.fePointLight': HTMLAttributes<SVGFEPointLightElement> & {
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
      'motion.feSpecularLighting': HTMLAttributes<SVGFESpecularLightingElement> & {
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
      'motion.feSpotLight': HTMLAttributes<SVGFESpotLightElement> & {
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
      'motion.feTile': HTMLAttributes<SVGFETileElement> & {
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
      'motion.feTurbulence': HTMLAttributes<SVGFETurbulenceElement> & {
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
      'motion.filter': HTMLAttributes<SVGFilterElement> & {
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
      'motion.mask': HTMLAttributes<SVGMaskElement> & {
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
      'motion.pattern': HTMLAttributes<SVGPatternElement> & {
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
      'motion.symbol': HTMLAttributes<SVGSymbolElement> & {
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
      'motion.use': HTMLAttributes<SVGUseElement> & {
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
    }
  }
}

// Also extend the Window interface for workbox
declare global {
  interface Window {
    workbox?: any;
  }
}
