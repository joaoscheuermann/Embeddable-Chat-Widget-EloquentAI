import { useLayoutEffect } from 'react';

// This hook ensures all styles are loaded before the component is mounted
export function useStyles(styles: Array<string>, root: DocumentFragment) {
  useLayoutEffect(() => {
    if (!root) {
      return;
    }

    const parsedStyles = styles
      .map((style) => style.replace(':root', ':host'))
      .map((style) => {
        const node = document.createElement('style');
        node.innerHTML = style;
        return node;
      });

    for (const style of parsedStyles) {
      root.prepend(style);
    }

    return () => {
      parsedStyles.forEach((node) => root.removeChild(node));
    };
  }, [root, styles]);
}
