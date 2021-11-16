import React from 'react';
import './SettingPanel.scss';
import { useAppContext } from '../context';
import { UISchema } from './UISchema';

const BIComponentMeta = (window as any).BIComponentMeta.default;

const styleSchema = BIComponentMeta.propsSchema.styleSchema;

export const SettingPanel: React.FC = React.memo(props => {
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
