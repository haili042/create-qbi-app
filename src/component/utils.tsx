import * as React from 'react';

// 绑定原生dom事件
export function useEventListener(
  element: HTMLElement,
  eventName: string,
  handler: (e: any) => void,
  options?: {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
  },
) {
  const savedHandler = React.useRef(null);
  const { capture, passive, once } = options ?? {};

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }

    const eventListener = (event: any) => savedHandler.current(event);
    const opts = { capture, passive, once };
    element.addEventListener(eventName, eventListener, opts);

    return () => {
      element.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
}
