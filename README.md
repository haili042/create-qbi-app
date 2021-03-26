# demo-project

这是一个用于在 QBI 中开发开放组件的项目

## 常用命令

- npm run start - 启动本地调试
- npm run build - 构建项目
- npm run pack - 将项目打包为 Quick BI 开发包

## 目录结构
├── build                # 构建产出目录
├── node_modules         # 项目相关包依赖
├── public               # 本地调试入口
│    └──index.html   		
├── src                  # 源码
│    ├──index.tsx        # 组件模块入口
│    ├──index.scss       # 组件样式文件
│    └──meta.ts          # 组件属性配置，包括数据、样式以及数据到视图的映射关系等。
├── .eslintrc            # eslint插件的配置文件
├── package.json         # 依赖包管理
├── README.md            # 项目说明文档
└── tsconfig.json        # typescript配置文件