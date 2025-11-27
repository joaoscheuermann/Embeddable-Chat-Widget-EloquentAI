import { forwardRef, IframeHTMLAttributes } from 'react';

export interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  title?: string;
}

export const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(
  ({ title = 'Chat Widget', style, ...props }, ref) => {
    return (
      <iframe
        ref={ref}
        title={title}
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          ...style,
        }}
        {...props}
      />
    );
  }
);

Iframe.displayName = 'Iframe';
