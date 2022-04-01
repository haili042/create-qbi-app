import * as React from 'react';
import './index.scss'

export const ModalContent: React.FC<{ text: string }> = React.memo(props => {
  return <div className="menu-content-container">{props.text}</div>;
});
