import { Separator } from 'inquirer';

export interface TemplateItem {
  /** template name */
  name: string;
  /** git branch name */
  value: string;
  /** desc */
  description?: string;
}

export type Template = (TemplateItem | InstanceType<typeof Separator>)[];

export interface TemplateMap {
  [key: string]: Template;
}

// latest version templates
export const TEMPLATES: Template = [
  new Separator('[custom chart]'),
  {
    name: 'chart',
    value: 'template/origin',
    description: 'Custom chart template',
  },
  {
    name: 'chart-react',
    value: 'template/react',
    description: 'Custom chart template using React framework',
  },
  {
    name: 'chart-vue',
    value: 'template/vue',
    description: 'Custom chart template using Vue framework',
  },
  new Separator('[custom menu]'),
  {
    name: 'menu-chart-card',
    value: 'template/menu-chart-card',
    description: 'Custom menu of dashboard card',
  },
  {
    name: 'menu-excel',
    value: 'template/menu-excel',
    description: 'Custom menu of web excel',
  },
  {
    name: 'menu-dashboard',
    value: 'template/menu-dashboard',
    description: 'Custom menu of dashboard',
  },
];

// legacy version v3.12 templates
export const LEGACY_V312_TEMPLATES: Template = [
  new Separator('[custom chart]'),
  {
    name: 'chart',
    value: 'legacy/v3.12/template/origin',
    description: '(v3.12) Custom chart template',
  },
  {
    name: 'chart-react',
    value: 'legacy/v3.12/template/react',
    description: '(v3.12) Custom chart template using React framework',
  },
  {
    name: 'chart-vue',
    value: 'legacy/v3.12/template/vue',
    description: '(v3.12) Custom chart template using Vue framework',
  },
];

export const LEGACY_VERSION: TemplateMap = {
  'v3.12': LEGACY_V312_TEMPLATES,
};

export const templateFilter = (list: Template) =>
  list.filter(each => !(each instanceof Separator)) as TemplateItem[];

export const GIT = 'https://github.com/haili042/create-qbi-app.git';
