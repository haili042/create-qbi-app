/**
 * 自定义组件
 */
import { Interfaces } from 'bi-open-sdk';
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
   * unmount 生命周期, 在卸载时触发
   */
  unmount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component unmount');
  }
}

export default MyComponent;
