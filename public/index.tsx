// import * as demo from 'qbi-open-demo-page';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Interfaces } from 'bi-open-menu-sdk';
import { initState } from './mock';

class CustomElement extends React.Component<{
  mount: Interfaces.LifecycleMount;
  update: Interfaces.LifecycleUpdate;
  unmount: Interfaces.LifecycleUnmount;
}> {
  componentDidMount() {
    const { mount } = this.props;
    if (typeof mount === 'function') {
      const props = this.getLifecycleProps();
      mount(props);
    }
  }

  componentDidUpdate() {
    const { update } = this.props;
    if (typeof update === 'function') {
      const props = this.getLifecycleProps();
      update(props);
    }
  }

  componentWillUnmount() {
    const { unmount } = this.props;
    if (typeof unmount === 'function') {
      const props = this.getLifecycleProps();
      unmount(props);
    }
  }

  getLifecycleProps() {
    return {
      container: this.ref.current,
      customProps: initState.customProps,
    };
  }

  ref = React.createRef<HTMLDivElement>();

  render() {
    return <div data-custom-component-root="dom" ref={this.ref} />;
  }
}

const App: React.FC = () => {
  return (
    <div style={{ marginTop: 100, marginLeft: 100, border: '1px solid #ddd', width: 200, height: 32 }}>
      <CustomElement {...(window as any).BIComponent} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
