/**
 * @flie 开放组件入口文件
 */
import * as React from 'react';
import { Interfaces, formatNumberWithConfig } from 'bi-open-react-sdk';
import Table from 'rc-table';
import { TitleRender } from './table-title';

interface IColumnItem {
  dataIndex: string;
  title: string;
  width?: number;
}

// 表格
const BITable: React.FC<Interfaces.ComponentProps> = React.memo(props => {
  const dataConfig = props.dataConfig;
  const viewConfig = props.viewConfig;
  const dispatch = props.dispatch;
  const fieldSettingMap = props.viewConfig?.fieldSettingMap;

  // 原始列
  const rawColumns: IColumnItem[] = React.useMemo(
    () =>
      (dataConfig ?? [])
        .filter(each => ['column', 'row'].includes(each.areaType))
        .reduce((prev: any[], curr) => {
          return [...prev, ...(curr.fields ?? [])];
        }, [])
        .map(each => ({
          title: each.fieldName,
          dataIndex: each.fieldId,
        })),
    [dataConfig],
  );

  const rootElem = React.useRef<HTMLDivElement>(null);

  // 计算表格高度
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      setHeight((rootElem.current?.offsetHeight ?? 0) - 40);
    }, 0);
  }, [rootElem.current?.offsetHeight]);

  const handleSelect = React.useCallback(
    param => {
      if (typeof dispatch === 'function') {
        dispatch({
          type: 'select',
          payload: param,
        });
      }
    },
    [dispatch],
  );

  // 全部列
  const allColumns: IColumnItem[] = React.useMemo(
    () =>
      rawColumns.map((each: IColumnItem) => ({
        ...each,
        title: fieldSettingMap?.[each.dataIndex]?.aliasName ?? each.title,
        width: 140,
        onHeaderCell: (column: any) => ({
          column,
        }),
        render: (text: any, record: any, index: number) => {
          let displayText = text;
          if (fieldSettingMap?.[each.dataIndex]?.numberFormat !== undefined) {
            displayText = formatNumberWithConfig(text, fieldSettingMap?.[each.dataIndex]?.numberFormat);
          }

          return (
            <div
              onClick={() => {
                handleSelect({ dataIndex: index });
              }}
            >
              {displayText}
            </div>
          );
        },
      })),
    [rawColumns, handleSelect, fieldSettingMap],
  );

  const [columns, setColumns] = React.useState(allColumns);
  React.useEffect(() => {
    setColumns(allColumns);
  }, [allColumns]);

  // 表格宽度
  const width = columns.reduce((prev: number, curr) => prev + (curr.width ?? 0), 0);

  const handleResize = React.useCallback(
    (column, newWidth) => {
      setColumns(
        columns.map(each => ({
          ...each,
          width: each.dataIndex === column.dataIndex ? newWidth : each.width,
        })),
      );
    },
    [columns],
  );

  const ResizableTitle = React.useCallback(props => <TitleRender {...props} onResize={handleResize} />, [handleResize]);

  // 原始数据
  const rawData = React.useMemo(
    () =>
      (props.data ?? []).map((each = []) => {
        return each.reduce(
          (prev: any, curr) => ({
            ...prev,
            [curr.fieldId]: curr.value,
          }),
          {},
        );
      }),
    [props?.data],
  );

  return (
    <div
      className={`test-table ${viewConfig.chartSkin.key === 'black' ? 'black' : ''}`}
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={rootElem}
    >
      <Table
        columns={columns}
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        scroll={{
          x: width,
          y: height,
        }}
        data={rawData}
      />
    </div>
  );
});

export default BITable;
