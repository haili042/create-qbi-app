/**
 * 自定义组件元信息
 */
import { Interfaces, I18n } from 'bi-open-sdk';

// 元信息国际化
const { t } = I18n.init({
  resources: {
    'en-US': {
      显示设置: 'display setting',
      显示图例: 'display legend',
      起始角度: 'start angle',
      请输出起始角度: 'please input start angle',
      '钻取/维度': 'drill / area',
      维度: 'area',
      度量: 'column',
      过滤器: 'filter',
    },
  },
});

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
            title: t('显示设置'),
            properties: {
              showLegend: {
                type: 'switch',
                id: 'showLegend',
                defaultValue: true,
                props: {
                  mode: 'checkbox',
                  label: t('显示图例'),
                },
              },
              startAngle: {
                title: t('起始角度'),
                id: 'startAngle',
                type: 'number',
                defaultValue: 0,
                props: {
                  placeholder: t('请输出起始角度'),
                  maxLength: 140,
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
            areaName: t('钻取/维度'),
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
            areaName: t('维度'),
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
            areaName: t('度量'),
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
            areaName: t('过滤器'), //  名称
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
