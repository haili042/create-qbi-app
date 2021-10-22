import React from 'react';
import { Interfaces } from 'bi-open-sdk';
import { useAppContext } from '../context';
import './Canvas.scss';
import { Card } from './Card';
import { Component } from './Component';

export const Canvas: React.FC<{ biComponent: Interfaces.Lifecycle }> = React.memo(props => {
  const ref = React.createRef<HTMLDivElement>();
  const { customProps, setCard } = useAppContext((state: any) => ({
    customProps: state.customProps,
  }));

  React.useEffect(() => {
    setCard({
      canvasWidth: ref.current.offsetWidth,
      canvasHeight: ref.current.offsetHeight,
    });
  }, [ref, setCard]);

  const handleResize = React.useCallback(
    e => {
      setCard({
        canvasWidth: ref.current.offsetWidth,
        canvasHeight: ref.current.offsetHeight,
      });
    },
    [ref, setCard],
  );

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize, true);
    };
  }, [handleResize]);

  return React.useMemo(
    () => (
      <div className="demo-canvas" ref={ref}>
        <Card title={customProps.viewConfig.caption}>
          <Component biComponent={props.biComponent} />
        </Card>
      </div>
    ),
    [customProps.viewConfig.caption, props.biComponent, ref],
  );
});
