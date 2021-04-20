/**
 * 自定义组件入口文件
 */
import { createBIComponent } from 'bi-open-vue-sdk';
import Component from './Component.vue';

export const { bootstrap, mount, unmount, update } = createBIComponent({
  element: Component,
});
