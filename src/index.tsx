import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import { Interfaces } from 'bi-open-sdk';
import { App } from './context';
import { SettingPanel } from './component/SettingPanel';
import { Canvas } from './component/Canvas';

export function qbiDemoPageRender(option: {
  biComponent: Interfaces.Lifecycle;
  componentMeta: Interfaces.ComponentMeta;
  initState: any;
  container: HTMLElement;
}) {
  const Demo: React.FC = React.memo(() => {
    return (
      <App initState={option.initState}>
        <div className="demo-layout">
          <div className="demo-action-panel"></div>
          <div className="demo-canvas-panel">
            <Canvas biComponent={option.biComponent}></Canvas>
          </div>
          <div className="demo-setting-panel">
            <SettingPanel componentMeta={option.componentMeta}></SettingPanel>
          </div>
        </div>
      </App>
    );
  });

  ReactDOM.render(<Demo />, option.container);
}
