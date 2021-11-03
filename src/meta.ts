/**
 * 自定义组件元信息
 */
import { Interfaces } from 'bi-open-react-sdk';

const componentMeta: Interfaces.ComponentMeta = {
  propsSchema: {
    styleSchema: {
      schema: {
        type: 'object',
        className: 'tabs-uischema-container',
        props: { mode: 'collapse' },
        properties: {
          // 请在此处填写你需要自定义的属性
          display: {
            type: 'object',
            title: '显示设置',
            properties: {
              showLegend: {
                type: 'switch',
                id: 'showLegend',
                defaultValue: true,
                props: {
                  mode: 'checkbox',
                  label: '显示图例',
                },
              },
              startAngle: {
                title: '其实角度',
                id: 'startAngle',
                type: 'number',
                defaultValue: 0,
                props: {
                  placeholder: '请输出起始角度',
                  maxLength: 140,
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
            fieldTypes: ['dimension'], // 维度还是计量,都可以接受为all
            // required: false, // 是否是更新图表必须字段
            /** 限制数量 */
            maxColNum: 6,
          },
        },
        {
          id: 'area_row',
          name: '维度',
          queryAxis: 'row',
          rule: {
            fieldTypes: ['dimension'], // 维度还是计量,都可以接受为all
            // maxColNum: 1, // 最多允许的字段数
            required: true, // 是否是更新图标必须字段
          },
        },
        {
          id: 'area_column',
          name: '度量',
          queryAxis: 'column',
          rule: {
            fieldTypes: ['measure'], // 维度还是计量,都可以接受为all
            // maxColNum: 3, // 最多允许的字段数
            required: true, // 是否是更新图标必须字段
          },
        },
        {
          id: 'filters',
          name: '过滤器', //  名称
          queryAxis: 'filters',
          rule: {
            fieldTypes: ['measure', 'dimension'],
            required: false,
          },
        },
      ],
      /** 限制条数 */
      resultDisplay: {
        upLimit: 1000,
      },
    },
  },
};

export default componentMeta;
