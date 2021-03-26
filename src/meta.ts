/**
 * 导出组件的相关配置
 */
import { Interfaces } from 'bi-open-sdk';

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
      schema: {
        area: [
          {
            id: 'drill',
            areaName: '钻取/维度',
            queryAxis: 'drill',
            rule: {
              type: 'dimension', // 维度还是计量,都可以接受为all
              required: false, // 是否是更新图表必须字段
              /** 限制数量 */
              maxColNum: 6,
            },
            columnList: [],
          },
          {
            id: 'area_row',
            areaName: '维度',
            queryAxis: 'row',
            rule: {
              type: 'dimension', // 维度还是计量,都可以接受为all
              maxColNum: 1, // 最多允许的字段数
              required: true, // 是否是更新图标必须字段
            },
            columnList: [],
          },
          {
            id: 'area_column',
            areaName: '度量',
            queryAxis: 'column',
            rule: {
              type: 'measure', // 维度还是计量,都可以接受为all
              maxColNum: 3, // 最多允许的字段数
              required: true, // 是否是更新图标必须字段
            },
            columnList: [],
          },
          {
            id: 'filters',
            areaName: '过滤器', //  名称
            queryAxis: 'filters',
            rule: {
              type: 'all',
              required: false,
            },
            columnList: [],
          },
        ],
        /** 限制条数 */
        limitNum: 1000,
      },
    },
  },
};

export default componentMeta;
