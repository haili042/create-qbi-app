/**
 * @flie 自定义组件入口文件
 */
import { createBIComponent } from 'bi-open-sdk';
import Component from './component';

export const { bootstrap, mount, unmount, update } = createBIComponent({
  element: Component,
});
