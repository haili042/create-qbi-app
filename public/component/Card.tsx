import React from 'react';
import { useAppContext } from '../context';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import './Card.scss';

interface Props {
  title?: string;
}

interface DragData {
  offsetX: number;
  offsetY: number;
  offsetXpx: number;
  offsetYpx: number;
}

interface DragProps {
  onStart?: (data: DragData) => void;
  onDrag?: (data: DragData) => void;
  onStop?: (data: DragData) => void;
}

const Drag: React.FC<DragProps> = props => {
  const [offsetXpx, setOffsetXpx] = React.useState(0);
  const [offsetYpx, setOffsetYpx] = React.useState(0);

  const { canvasWidth } = useAppContext(state => ({
    canvasWidth: state.card.canvasWidth,
  }));

  const handleDragStart = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof props.onStart === 'function') {
        const offsetX = Math.round(offsetXpx / (canvasWidth / 12));
        const offsetY = Math.round(offsetYpx / 25);
        props.onStart({
          offsetX,
          offsetY,
          offsetXpx,
          offsetYpx,
        });
      }
    },
    [canvasWidth, offsetXpx, offsetYpx, props],
  );

  const handleDrag = React.useCallback(
    (e: DraggableEvent, ui: DraggableData) => {
      e.preventDefault();
      e.stopPropagation();
      const newOffsetX = offsetXpx + ui.deltaX;
      const newOffsetY = offsetYpx + ui.deltaY;
      setOffsetXpx(newOffsetX);
      setOffsetYpx(newOffsetY);
      if (typeof props.onDrag === 'function') {
        const offsetX = Math.round(newOffsetX / (canvasWidth / 12));
        const offsetY = Math.round(newOffsetY / 25);
        props.onDrag({
          offsetX,
          offsetY,
          offsetXpx: newOffsetX,
          offsetYpx: newOffsetY,
        });
      }
    },
    [canvasWidth, offsetXpx, offsetYpx, props],
  );

  const handleDragStop = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setOffsetXpx(0);
      setOffsetYpx(0);
      if (typeof props.onStop === 'function') {
        const offsetX = Math.round(offsetXpx / (canvasWidth / 12));
        const offsetY = Math.round(offsetYpx / 25);
        props.onStop({
          offsetX,
          offsetY,
          offsetXpx,
          offsetYpx,
        });
      }
    },
    [canvasWidth, offsetXpx, offsetYpx, props],
  );

  return React.useMemo(
    () => (
      <Draggable
        position={{
          x: offsetXpx,
          y: offsetYpx,
        }}
        onStart={handleDragStart}
        onDrag={handleDrag}
        onStop={handleDragStop}
      >
        {props.children}
      </Draggable>
    ),
    [offsetXpx, offsetYpx, handleDrag, handleDragStart, handleDragStop, props.children],
  );
};

const Resize: React.FC = () => {
  const { top, left, width, height, setCard } = useAppContext(state => ({
    top: state.card.top,
    left: state.card.left,
    width: state.card.width,
    height: state.card.height,
    canvasWidth: state.card.canvasWidth,
    canvasHeight: state.card.canvasHeight,
  }));

  const [rectStyle, setRectStyle] = React.useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const [resizing, setResizing] = React.useState(false);

  const handleDragStart = React.useCallback(() => {
    setResizing(true);
  }, []);

  const handleDragNE = React.useCallback(data => {
    setRectStyle({
      top: data.offsetY,
      left: 0,
      bottom: 0,
      right: -data.offsetX,
    });
  }, []);

  const handleDragNW = React.useCallback(data => {
    setRectStyle({
      top: data.offsetY,
      left: data.offsetX,
      bottom: 0,
      right: 0,
    });
  }, []);

  const handleDragSE = React.useCallback(data => {
    setRectStyle({
      top: 0,
      left: 0,
      bottom: -data.offsetYpx,
      right: -data.offsetXpx,
    });
  }, []);

  const handleDragSW = React.useCallback(data => {
    setRectStyle({
      top: 0,
      left: data.offsetX,
      bottom: -data.offsetY,
      right: 0,
    });
  }, []);

  const handleDropNE = React.useCallback(
    data => {
      if (
        left + width + data.offsetX <= 12 &&
        width + data.offsetX > 1 &&
        height - data.offsetY > 1 &&
        top + data.offsetY >= 0
      ) {
        setCard({
          top: top + data.offsetY,
          width: width + data.offsetX,
          height: height - data.offsetY,
        });
      }
      setRectStyle({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
      setResizing(false);
    },
    [height, left, setCard, top, width],
  );

  const handleDropNW = React.useCallback(
    data => {
      if (
        left + data.offsetX >= 0 &&
        width - data.offsetX > 1 &&
        height - data.offsetY > 1 &&
        top + data.offsetY >= 0
      ) {
        setCard({
          top: top + data.offsetY,
          left: left + data.offsetX,
          width: width - data.offsetX,
          height: height - data.offsetY,
        });
      }
      setRectStyle({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
      setResizing(false);
    },
    [height, left, setCard, top, width],
  );

  const handleDropSE = React.useCallback(
    data => {
      if (left + width + data.offsetX <= 12 && width + data.offsetX > 1 && height + data.offsetY > 1) {
        setCard({
          width: width + data.offsetX,
          height: height + data.offsetY,
        });
      }
      setRectStyle({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
      setResizing(false);
    },
    [height, left, setCard, width],
  );

  const handleDropSW = React.useCallback(
    data => {
      if (left + data.offsetX >= 0 && width - data.offsetX > 1 && height + data.offsetY > 1) {
        setCard({
          left: left + data.offsetX,
          width: width - data.offsetX,
          height: height + data.offsetY,
        });
      }
      setRectStyle({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      });
      setResizing(false);
    },
    [height, left, setCard, width],
  );

  return (
    <>
      {resizing && <div style={rectStyle} className="demo-card-resize-rect"></div>}
      <Drag onStart={handleDragStart} onDrag={handleDragNE} onStop={handleDropNE}>
        <div className="demo-card-resize ne"></div>
      </Drag>
      <Drag onStart={handleDragStart} onDrag={handleDragNW} onStop={handleDropNW}>
        <div className="demo-card-resize nw"></div>
      </Drag>
      <Drag onStart={handleDragStart} onDrag={handleDragSE} onStop={handleDropSE}>
        <div className="demo-card-resize se"></div>
      </Drag>
      <Drag onStart={handleDragStart} onDrag={handleDragSW} onStop={handleDropSW}>
        <div className="demo-card-resize sw"></div>
      </Drag>
    </>
  );
};

export const Card: React.FC<Props> = React.memo(props => {
  const { top, left, width, height, setCard } = useAppContext(state => ({
    top: state.card.top,
    left: state.card.left,
    width: state.card.width,
    height: state.card.height,
  }));

  // 拖动卡片
  const handleDragEnd = React.useCallback(
    (data: DragData) => {
      if (left + width + data.offsetX <= 12 && left + data.offsetX >= 0 && top + data.offsetY >= 0) {
        setCard({
          left: left + data.offsetX,
          top: top + data.offsetY,
        });
      }
    },
    [left, width, top, setCard],
  );

  return (
    <Drag onStop={handleDragEnd}>
      <div
        className="demo-card"
        style={{
          gridRowStart: top + 1,
          gridRowEnd: top + 1 + height,
          gridColumnStart: left + 1,
          gridColumnEnd: left + 1 + width,
        }}
      >
        <div className="demo-card-content">
          <div className="demo-card-title">{props.title}</div>
          <div className="demo-card-action"></div>
          <div className="demo-card-body">{props.children}</div>
        </div>
        <Resize />
      </div>
    </Drag>
  );
});
