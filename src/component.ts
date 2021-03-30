/**
 * 自定义组件
 */
import { Interfaces, Utils } from 'bi-open-sdk';
import _ from 'lodash';
import './index.scss';

class MyComponent {
  render(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const viewConfig = props.customProps.viewConfig;

    props.container.textContent = `I ${viewConfig.fruit?.apple ? 'like' : "don't like"} apple, I want to eat ${
      viewConfig.fruit?.banana
    } banana`;
  }

  /**
   * mount 生命周期, 在渲染时触发
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    props.container.classList.add('test-component');
    console.log('trigger when component mount');
    this.render(props);
  }

  /**
   * update 生命周期, 在更新时触发
   */
  update(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component update');
    this.render(props);
  }

  /**
   * umount 生命周期, 在卸载时触发
   */
  umount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component unmount');
  }
}

export default MyComponent;
