export const customProps = {
  viewConfig: {
    fieldSettingMap: {
      '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||': {
        uuid: 'e36fc2a2-e5e7-4135-9a50-4a50b69f09ba',
        aliasName: 'price213',
        alignment: 'right',
        areaType: 'column',
        nameChangedFlag: true,
        numberFormat: {
          formatModal: '1',
          fmtType: 'None',
          valueModal: '1',
          decimalPlaces: '0',
          thousandth: false,
          magnitudeFormat: 0,
          dataMagnitude: '',
          selectType: 'percent',
        },
        label: false,
      },
      '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||': {
        uuid: '0b1561c4-59b2-4b62-9a3c-319c05322733',
        aliasName: 'shipping_cost2134',
        alignment: 'right',
        areaType: 'column',
        nameChangedFlag: true,
        numberFormat: {
          formatModal: '1',
          fmtType: 'None',
          valueModal: '1',
          decimalPlaces: '0',
          thousandth: false,
          magnitudeFormat: 0,
          dataMagnitude: '',
          selectType: 'percent',
        },
        label: false,
      },
    },
    title: {
      color: null,
      show: true,
    },
    caption: 'demo组件标题',
    width: 471,
    height: 426,
    linkageParam: null,
    chartColorSeries: {
      key: 'girl',
      name: '女性时尚',
      colors: [
        '#6861F9',
        '#3EB6FF',
        '#EF84D4',
        '#E7BBF3',
        '#5FEB90',
        '#95E28E',
        '#6DCEE5',
        '#D85B97',
        '#F0B372',
        '#98BFFB',
        '#66E0E4',
        '#ECABB4',
      ],
    },
    chartSkin: {
      key: 'default',
    },
  },
  advancedConfig: {},
  dataConfig: [
    {
      areaType: 'drill',
      fields: [
        {
          fieldId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
          pathId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
          fieldName: 'area',
          showName: 'area',
          valueType: 'location',
          fieldType: 'dimension',
          aggregation: null,
          dimGranularity: 'REGION',
          order: null,
          advancedCalculation: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
        {
          fieldId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_province].[Nd77800_province].[Nd77800_province]',
          pathId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_province].[Nd77800_province].[Nd77800_province]',
          uuid: '7e209cc4-07c1-409e-a0a8-601ec5cb68e5',
          fieldName: 'province',
          showName: 'province',
          valueType: 'string',
          fieldType: 'dimension',
          aggregation: null,
          order: null,
          advancedCalculation: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
        {
          fieldId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_city].[Nd77800_city].[Nd77800_city]',
          pathId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_city].[Nd77800_city].[Nd77800_city]',
          uuid: 'fef2b763-b195-49ad-b615-19fd3218122f',
          fieldName: 'city',
          showName: 'city',
          valueType: 'string',
          fieldType: 'dimension',
          aggregation: null,
          order: null,
          advancedCalculation: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
      ],
    },
    {
      areaType: 'row',
      fields: [
        {
          fieldId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
          pathId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area]',
          uuid: 'da2c9921-ff4f-4cee-8ad8-d7c879325809',
          fieldName: 'area',
          showName: 'area',
          valueType: 'location',
          fieldType: 'dimension',
          aggregation: null,
          displayType: null,
          dimGranularity: 'REGION',
          order: null,
          advancedCalculation: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
      ],
    },
    {
      areaType: 'column',
      fields: [
        {
          fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
          pathId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]',
          uuid: 'e36fc2a2-e5e7-4135-9a50-4a50b69f09ba',
          skin: 'number',
          fieldName: 'price',
          showName: 'price',
          isCalc: false,
          valueType: 'number',
          fieldType: 'measure',
          aggregation: 'sum',
          order: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
        {
          fieldId:
            '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
          pathId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]',
          uuid: '0b1561c4-59b2-4b62-9a3c-319c05322733',
          skin: 'number',
          fieldName: 'shipping_cost',
          showName: 'shipping_cost',
          isCalc: false,
          valueType: 'number',
          fieldType: 'measure',
          aggregation: 'sum',
          order: null,
          extends: {},
          complexFilter: {
            limitNum: 1000,
            filter: false,
          },
        },
      ],
    },
    {
      areaType: 'filters',
      fields: [],
    },
  ],
  data: [
    [
      {
        originValue: '东北',
        value: '东北',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '东北',
          longitude: 128.1005859,
          latitude: 46.83013364,
        },
      },
      {
        originValue: '185634.46',
        value: '185634.46',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '31532.080000000005',
        value: '31532.080000000005',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
    [
      {
        originValue: '华东',
        value: '华东',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '华东',
          longitude: 119.0039063,
          latitude: 30.44867368,
        },
      },
      {
        originValue: '308119.0399999999',
        value: '308119.0399999999',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '39083.94000000001',
        value: '39083.94000000001',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
    [
      {
        originValue: '华北',
        value: '华北',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '华北',
          longitude: 112.7197266,
          latitude: 42.14375133,
        },
      },
      {
        originValue: '305009.04000000004',
        value: '305009.04000000004',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '42977.63999999999',
        value: '42977.63999999999',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
    [
      {
        originValue: '华南',
        value: '华南',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '华南',
          longitude: 111.0058594,
          latitude: 22.59372606,
        },
      },
      {
        originValue: '553049.0599999995',
        value: '553049.0599999995',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '82162.45999999998',
        value: '82162.45999999998',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
    [
      {
        originValue: '西北',
        value: '西北',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '西北',
          longitude: 89.20898438,
          latitude: 40.44694706,
        },
      },
      {
        originValue: '115111.32',
        value: '115111.32',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '18213.44',
        value: '18213.44',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
    [
      {
        originValue: '西南',
        value: '西南',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_area].[Nd77800_area].[Nd77800_area]',
        geoInfo: {
          dimGranularity: 'REGION',
          continent: 'Asia',
          country: 'China',
          region: '西南',
          longitude: 89.47265625,
          latitude: 31.20340495,
        },
      },
      {
        originValue: '47685.25999999999',
        value: '47685.25999999999',
        fieldId: '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_price]|SUM||',
        geoInfo: false,
      },
      {
        originValue: '6696.419999999996',
        value: '6696.419999999996',
        fieldId:
          '17e47929-c425-48ea-8a35-d0d5ae760263.d7780001-6d63-43e1-9ecd-74789a6b4fdb.[Nd77800_shipping_cost]|SUM||',
        geoInfo: false,
      },
    ],
  ],
  globalConfig: {
    advancedResult: {
      summarizeResults: [],
      trendLineResults: [],
      anomalyDetectionResults: [],
      forecastResults: [],
      clusteringResults: [],
    },
    annotationResult: {
      measureThresholdResults: [],
      inflectionPointAnnotationResults: [],
    },
    isDrill: false,
    relationDim: null,
    relationType: 'x',
    env: ['pc'],
    renderMode: 'edit',
  },
};
