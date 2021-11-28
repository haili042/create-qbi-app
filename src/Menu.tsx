import * as React from 'react';
import { Interfaces, MenuItem } from 'bi-open-menu-sdk';

export const MyCardMenu: React.FC<Interfaces.MenuComponentProps> = React.memo(props => {
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = React.useCallback(e => {
    e.stopPropagation();

    setLoading(true);
    setDisabled(true);
  }, []);

  return (
    <MenuItem
      title="自定义菜单"
      disabled={disabled}
      hoverTip="鼠标 hover 提示"
      loading={loading}
      onClick={handleClick}
    />
  );
});
