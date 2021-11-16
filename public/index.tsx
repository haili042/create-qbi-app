import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './context';
import { SettingPanel } from './component/SettingPanel';
import { Canvas } from './component/Canvas';

const Demo: React.FC = React.memo(() => {
  return (
    <App>
      <div className="demo-layout">
        <div className="demo-action-panel"></div>
        <div className="demo-canvas-panel">
          <Canvas></Canvas>
        </div>
        <div className="demo-setting-panel">
          <SettingPanel></SettingPanel>
        </div>
      </div>
    </App>
  );
});

ReactDOM.render(<Demo />, document.getElementById('root'));
