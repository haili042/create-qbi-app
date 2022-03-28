import * as React from 'react';
import { Interfaces, MenuItem } from 'bi-open-menu-sdk';

export const MyCardMenu: React.FC<Interfaces.MenuComponentChartProps> = React.memo(props => {
  // 点击事件
  const handleClick = React.useCallback(() => {
    console.log('click');
    console.log('props', props);
    props.dispatch({
      type: 'openModal',
      payload: {
        title: '我是标题',
        content: <iframe src="https://www.yuque.com/u2227425/ia1pn8/nvg5q6" width="100%"></iframe>,
        onCancel: () => {
          console.log('关闭事件');
        },
        onOk: () => {
          console.log('确认事件');
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        cancelText: '点我取消',
        okText: '前往',
        cancelButtonProps: {
          style: { display: 'none' },
        },
        okButtonProps: {
          disabled: true,
        },
      },
    });
  }, [props]);

  return (
    <MenuItem
      // 默认的自定义菜单组件
      title="自定义菜单"
      disabled={false}
      loading={false}
      onClick={handleClick}
    />
  );
});
