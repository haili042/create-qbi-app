import React from 'react';
import './SettingPanel.scss';
import { Interfaces } from 'bi-open-sdk';
import { useAppContext } from '../context';
import { UISchema } from './UISchema';

export const SettingPanel: React.FC<{
  componentMeta: Interfaces.ComponentMeta;
}> = React.memo(props => {
  const styleSchema: any = props.componentMeta.propsSchema.styleSchema;
  const { viewConfig, setCustomPropsViewConfig } = useAppContext(state => ({
    viewConfig: state.customProps.viewConfig,
  }));

  const handleChange = React.useCallback(
    value => {
      setCustomPropsViewConfig(value);
    },
    [setCustomPropsViewConfig],
  );

  return (
    <div className="demo-setting-panel-wrapper">
      <UISchema data={viewConfig} schema={styleSchema.schema} onChange={handleChange}></UISchema>
    </div>
  );
});
