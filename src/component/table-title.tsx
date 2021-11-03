/**
 * @flie 开放组件入口文件
 */
import * as React from 'react';
import { useEventListener } from './utils';

// 可拖动表头
export const TitleRender: React.FC<any> = React.memo(props => {
  const { children, column, onResize, ...restProps } = props;
  const ref = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const [xStart, setXStart] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  const handleDragStart = React.useCallback((e: any) => {
    e.stopPropagation();
    setDragging(true);
    setXStart(e.clientX);
  }, []);

  const handleDrag = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      const diff = e.clientX - xStart + (ref.current?.offsetWidth ?? 0);
      if (diff > 0) {
        setOffset(diff);
      }
    },
    [xStart, ref.current?.offsetWidth],
  );

  const handleDragEnd = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      // e.nativeEvent.stopImmediatePropagation();
      setDragging(false);
      if (typeof onResize === 'function') {
        onResize(column, e.clientX - xStart + (ref.current?.offsetWidth ?? 0));
      }
    },
    [xStart, column, onResize, ref.current?.offsetWidth],
  );

  const dragRef = React.useRef(null);

  useEventListener(dragRef.current, 'dragstart', handleDragStart);
  useEventListener(dragRef.current, 'drag', handleDrag);
  useEventListener(dragRef.current, 'dragend', handleDragEnd);

  return (
    <th {...restProps} ref={ref}>
      {dragging && <div className="resize-edge"></div>}
      <div className="test-table-head-wrap">
        {children}
        <span ref={dragRef} draggable={true} className="resize-handler" />
      </div>
      {dragging && (
        <div
          className="resize-edge"
          style={{
            left: offset,
          }}
        ></div>
      )}
    </th>
  );
});
