import * as React from 'react';
import { Interfaces, MenuItem } from 'bi-open-menu-sdk';
import { ModalContent } from './ModalContent';

export const MyCardMenu: React.FC<Interfaces.MenuComponentChartProps> = React.memo(props => {
  // 点击事件
  const handleClick = React.useCallback(() => {
    console.log('props', props);
    props.dispatch({
      type: 'openModal',
      payload: {
        title: '弹窗标题',
        content: <ModalContent text="这里是弹窗内容" />,
        onCancel: () => {
          console.log('关闭事件');
        },
        onOk: () => {
          console.log('确认事件');
          return new Promise((resolve, reject) => {
            // 延时关闭
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        okText: '前往',
        cancelButtonProps: {
          style: { display: 'none' },
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
