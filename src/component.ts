/**
 * 自定义组件
 */
import * as echarts from 'echarts';
import { Interfaces, Utils, I18n } from 'bi-open-sdk';
import './index.scss';

// 国际化相关
const { t } = I18n.init({
  resources: {
    'en-US': {
      暂无数据: 'no data',
    },
  },
});

class MyComponent {
  chart: echarts.ECharts;

  lastSize: {
    width: number;
    height: number;
  };

  setOption(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    if (this.chart) {
      const customProps = props.customProps;
      const data = customProps.data;
      const dataConfig = customProps.dataConfig;
      const viewConfig = customProps.viewConfig;
      const fieldSettingMap = viewConfig.fieldSettingMap;

      // 主题颜色
      const colorSeries = customProps.viewConfig?.chartColorSeries?.colors ?? [];

      // 所有度量
      const rowFields = dataConfig.find(each => each.areaType === 'row')?.fields ?? [];

      // 所有度量
      const columnsFields = dataConfig.find(each => each.areaType === 'column')?.fields ?? [];

      // 第一行数据
      const [firstRow] = data;

      // 度量对应的列下标
      const fieldColumnIndexMap: {
        [key: string]: number;
      } = firstRow.reduce(
        (prev, curr, i: number) => ({
          ...prev,
          [curr.fieldId]: i,
        }),
        {},
      );

      // dataConfig 转为 echarts series 数据格式
      const series = columnsFields.map((each, i) => {
        const filedSetting = fieldSettingMap[each.fieldId];
        return {
          id: each.fieldId,
          type: 'bar',
          data: data.map(row => row[fieldColumnIndexMap[each.fieldId]]?.value),
          coordinateSystem: 'polar',
          // 设置别名
          name: filedSetting?.aliasName ?? each.showName,
          // 设置色系
          color: colorSeries[i],
        };
      });

      // 图例
      const legend = series.map(each => each.name);

      // meta 中限制了只有一个维度
      const [onlyRow] = rowFields;
      const category = data.map(row => row[fieldColumnIndexMap[onlyRow?.fieldId]]?.value);

      // 绘制图表
      this.chart.setOption({
        angleAxis: {
          startAngle: viewConfig.display?.startAngle,
        },
        radiusAxis: {
          type: 'category',
          data: category,
          z: 10,
        },
        polar: {
          radius: '60%',
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: viewConfig.chartSkin.key === 'black' ? '#fff' : '#333',
          },
          backgroundColor: viewConfig.chartSkin.key === 'black' ? '#222' : '#fff',
          extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);',
          formatter: (param: any) => {
            const fieldSetting = fieldSettingMap[param.seriesId];
            const value = Utils.formatNumberWithConfig(param.value, fieldSetting?.numberFormat);

            return `${param.seriesName ?? t('暂无数据')}<br />${param.name}: ${param.marker}${value}`;
          },
        },
        series,
        legend: {
          show: viewConfig.display?.showLegend,
          data: legend,
          top: 10,
          padding: 0,
          textStyle: {
            color: viewConfig.chartSkin.key === 'black' ? '#fff' : '#333',
          },
        },
        textStyle: {
          color: viewConfig.chartSkin.key === 'black' ? '#fff' : '#333',
        },
      });
    }
  }

  /**
   * 绑定事件
   * @param props
   */
  bindEvents(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const customProps = props.customProps;
    const dispatch = customProps.dispatch;

    if (typeof dispatch === 'function') {
      this.chart.on('click', (serie: any) => {
        dispatch({
          type: 'select',
          payload: {
            dataIndex: serie.dataIndex,
          },
        });
      });

      // 点击空白处事件, 用于适配移动端下钻
      // @ts-ignore
      this.chart.getZr().on('click', function (e) {
        if (!e.target) {
          dispatch({
            type: 'cancelSelect',
          });
        }
      });
    }
  }

  /**
   * 保存上次大小, 用于性能优化
   */
  setLastSize(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const width = props.container.offsetWidth;
    const height = props.container.offsetHeight;

    // 容器大小变更时触发 resize
    if (this.lastSize && (this.lastSize?.width !== width || this.lastSize?.height !== height)) {
      this.chart.resize();
    }

    this.lastSize = {
      width,
      height,
    };
  }

  /**
   * mount 生命周期, 在渲染时触发
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    props.container.classList.add('test-component');
    if (!echarts) {
      props.container.textContent = '无法获取 echarts, 请确保已经配置并加载了 echarts.js';
      return;
    }
    this.chart = echarts.init(props.container as HTMLDivElement);

    this.bindEvents(props);
    this.setOption(props);
    this.setLastSize(props);
  }

  /**
   * update 生命周期, 在更新时触发
   */
  update(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    this.setOption(props);

    this.setLastSize(props);
  }

  /**
   * umount 生命周期, 在卸载时触发
   */
  umount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component unmount');
  }
}

export default MyComponent;
