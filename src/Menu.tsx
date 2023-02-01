import * as React from 'react';
import { Interfaces, MenuItem } from 'bi-open-menu-sdk';

export const MyCardMenu: React.FC<Interfaces.MenuComponentExcelProps> = React.memo(props => {
  // 点击事件
  const handleClick = React.useCallback(
    e => {
      console.log(props);
    },
    [props],
  );

  return (
    <MenuItem
      // 默认的自定义菜单组件
      title="自定义菜单"
      disabled={false}
      hoverTip="鼠标 hover 提示"
      loading={false}
      onClick={handleClick}
    />
  );
});
