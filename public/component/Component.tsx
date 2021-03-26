import React from 'react';
import { useAppContext } from '../context';

const BIComponent = (window as any).BIComponent;

export const Component: React.FC = React.memo(props => {
  const ref = React.useRef();
  const hasMounted = React.useRef(false);
  const { width, height, customProps } = useAppContext(state => ({
    customProps: state.customProps,
    width: state.card.width,
    height: state.card.height,
  }));

  React.useEffect(() => {
    if (hasMounted.current) {
      BIComponent.update({
        container: ref.current,
        customProps,
      });
    }
  }, [customProps, width, height]);

  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      BIComponent.mount({
        container: ref.current,
        customProps,
      });
    }

    return () => {
      BIComponent.unmount({
        container: ref.current,
        customProps,
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
});
