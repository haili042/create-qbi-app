/**
 * 自定义组件入口文件
 */
import './index.scss';
import { createBIComponent } from 'bi-open-react-sdk';
import Component from './component';

export const { bootstrap, mount, unmount, update } = createBIComponent({
  element: Component,
});
