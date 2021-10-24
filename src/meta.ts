/**
 * 自定义组件元信息
 */
import { Interfaces } from 'bi-open-vue-sdk';

const componentMeta: Interfaces.ComponentMeta = {
  propsSchema: {
    styleSchema: {
      schema: {
        type: 'object',
        className: 'tabs-uischema-container',
        props: { mode: 'collapse' },
        properties: {
          // 请在此处填写你需要自定义的属性
          fruit: {
            type: 'object',
            properties: {
              apple: {
                type: 'switch',
                defaultValue: true,
                props: {
                  mode: 'checkbox',
                  label: '苹果',
                },
              },
              banana: {
                title: '香蕉',
                type: 'number',
                defaultValue: 1,
                props: {
                  maxLength: 20,
                },
              },
            },
          },
        },
      },
    },
    dataSchema: {
      areas: [
        {
          id: 'drill',
          name: '钻取/维度',
          queryAxis: 'drill',
          rule: {
            fieldTypes: ['dimension'],
            required: false,
            maxColNum: 6,
          },
        },
        {
          id: 'area_row',
          name: '维度',
          queryAxis: 'row',
          rule: {
            fieldTypes: ['dimension'], // 维度还是计量,都可以接受为all
            maxColNum: 1, // 最多允许的字段数
            required: true, // 是否是更新图标必须字段
          },
        },
        {
          id: 'area_column',
          name: '度量',
          queryAxis: 'column',
          rule: {
            fieldTypes: ['measure', 'dimension'],
            // fieldGroupTypes: ['dimensionGroup'],
            maxColNum: 3,
            required: true,
          },
        },
        {
          id: 'filters',
          name: '过滤器', //  名称
          queryAxis: 'filters',
          rule: {
            fieldTypes: ['dimension', 'measure'],
            required: false,
          },
        },
      ],
      resultDisplay: {
        upLimit: 1000,
      },
    },
  },
};

export default componentMeta;
