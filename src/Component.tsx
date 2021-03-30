/**
 * 自定义组件
 */
import * as React from 'react';
import { Interfaces, Utils } from 'bi-open-react-sdk';
import _ from 'lodash';
import './index.scss';

const MyComponent: React.FC<Interfaces.ComponentProps> = React.memo(props => {
  const viewConfig = props.viewConfig;

  const text = `I ${viewConfig.fruit?.apple ? 'like' : "don't like"} apple, I want to eat ${
    viewConfig.fruit?.banana
  } banana`;

  return <div>{text}</div>;
});

export default MyComponent;
