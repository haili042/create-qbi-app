import React from 'react';
import { Interfaces } from 'bi-open-sdk';
import { useAppContext } from '../context';

export const Component: React.FC<{ biComponent: Interfaces.Lifecycle }> = React.memo(props => {
  const ref = React.useRef();
  const hasMounted = React.useRef(false);
  const biComponent = props.biComponent;
  const { width, height, customProps } = useAppContext((state: any) => ({
    customProps: state.customProps,
    width: state.card.width,
    height: state.card.height,
  }));

  React.useEffect(() => {
    if (hasMounted.current) {
      biComponent.update({
        container: ref.current,
        customProps,
      });
    }
  }, [customProps, width, height, biComponent]);

  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      biComponent.mount({
        container: ref.current,
        customProps,
      });
    }

    return () => {
      biComponent.unmount({
        container: ref.current,
        customProps,
      });
    };
  }, [biComponent]);

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
