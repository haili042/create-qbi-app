import React from 'react';
import { UISchemaLite, getDefaultValue } from 'ui-schema-lite';
import 'antd/dist/antd.css';
import 'ui-schema-editors/dist/module/index.css';
import 'ui-schema-lite/dist/module/index.css';
import {
  AreaColorEditor,
  BubbleSizeEditor,
  CheckboxEditor,
  ColorDataRangesEditor,
  MultiSelectEditor,
  NumberEditor,
  RadioEditor,
  RadioIconEditor,
  SelectEditor,
  SelectFontSizeEditor,
  SliderEditor,
  StringEditor,
  SwitchEditor,
  TabEditor,
  TextColorEditor,
} from 'ui-schema-editors';
import { useAppContext } from '../context';

const editors: any = {
  'area-color': AreaColorEditor,
  'bubble-size': BubbleSizeEditor,
  checkbox: CheckboxEditor,
  'color-data-ranges': ColorDataRangesEditor,
  'multi-select': MultiSelectEditor,
  number: NumberEditor,
  radio: RadioEditor,
  'qbi-radio-icon': RadioIconEditor,
  select: SelectEditor,
  'select-font-size': SelectFontSizeEditor,
  slider: SliderEditor,
  switch: SwitchEditor,
  string: StringEditor,
  tab: TabEditor,
  'text-color': TextColorEditor,
};

// 封装 ui-schema
export const UISchema: React.FC<any> = React.memo(props => {
  const { setCustomPropsViewConfig } = useAppContext();

  // 设置默认值
  React.useEffect(() => {
    const defaultValue = getDefaultValue(props.schema);
    setCustomPropsViewConfig(defaultValue);
  }, [props.schema, setCustomPropsViewConfig]);

  return (
    <UISchemaLite
      editors={editors}
      data={props.data}
      schema={props.schema}
      onChange={props.handleChange}
    ></UISchemaLite>
  );
});
