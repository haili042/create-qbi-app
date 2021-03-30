/**
 * 自定义组件入口文件
 */
import { createBIComponent } from 'bi-open-react-sdk';
import Component from './Component';

export const { bootstrap, mount, unmount, update } = createBIComponent({
  element: Component,
});
