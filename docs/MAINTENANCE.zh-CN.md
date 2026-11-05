# 网站手动修改指南

网站主入口是 Next.js 的 `app/`。协议编辑器是其中一个模块，位于 `src/`。
先从下面的表格找到对应文件，通常不需要同时修改界面、计算和存储。

## 常见修改去哪里改

| 想修改什么                                 | 文件或目录                                                     |
| ------------------------------------------ | -------------------------------------------------------------- |
| 网站名称、网址、公共联系方式、顶部导航     | `lib/config/site.js`                                           |
| 搜索引擎介绍、分享卡片和结构化数据         | `lib/seo.js`，各页面的 `metadata`                              |
| 首页文字、图片区域、按钮                   | `app/(website)/page.jsx`                                       |
| About 页面                                 | `app/(website)/about/page.jsx`                                 |
| 定制柜体服务页面                           | `app/(website)/custom-cabinetry/page.jsx`                      |
| Why Choose Us 页面                         | `app/(website)/why-made-in-china/page.jsx`                     |
| 网站页头、页脚                             | `components/SiteHeader.jsx`、`components/SiteFooter.jsx`       |
| 公共页面样式                               | `app/styles/public.css`                                        |
| 后台及通用布局样式                         | `app/styles/workspace.css`                                     |
| 导航、手机菜单和页面边距覆盖样式           | `app/styles/navigation.css`                                    |
| 项目阶段、优先级、案例分类、上传格式与限制 | `lib/config/workspace.js`                                      |
| 项目列表和看板                             | `components/Board.jsx`                                         |
| 项目编辑弹窗                               | `components/board/ProjectEditor.jsx`                           |
| 案例列表和保存流程                         | `components/Publisher.jsx`                                     |
| 案例编辑表单                               | `components/publishing/StoryEditor.jsx`                        |
| 柜体报价表的列、输入框位置                 | `src/editors/supply/components/quotation/JoineryQuotation.jsx` |
| 石材报价表的列、输入框位置                 | `src/editors/supply/components/quotation/StoneQuotation.jsx`   |
| 报价表 Logo、标题和 GST 提示               | `src/editors/supply/components/quotation/QuotationHeader.jsx`  |
| 金额、面积输入、恢复自动计算和打印文字     | `src/editors/supply/components/quotation/QuotationFields.jsx`  |
| 报价公式、合计及协议价格同步               | `src/editors/supply/utils/quotationCalculations.js`            |
| 新增报价行的默认字段                       | `src/editors/supply/data/quotationRows.js`                     |
| 合同默认条款、初始数据                     | `src/editors/<类型>/data/defaultAgreement.js`                  |
| 合同正文排版                               | `src/editors/<类型>/components/AgreementPreview.jsx`           |
| 合同左侧编辑栏                             | `src/editors/<类型>/components/Sidebar.jsx`                    |
| 协议通用样式                               | `src/styles/editor/core.css`                                   |
| 报价表基础样式                             | `src/styles/editor/quotation.css`                              |
| 安装协议和编辑器选择控件样式               | `src/styles/editor/installation.css`                           |
| 单价、金额及面积编辑控件样式               | `src/styles/editor/quotation-pricing.css`                      |
| 打印隐藏、分页、A4 方向                    | `src/styles/print.css`                                         |

`<类型>` 为 `supply`（供货安装）、`preliminary`（前期设计）、`installation`（仅安装）。
网站公共联系方式集中在配置中；合同内的公司资料仍属于各自的合同模板，修改公司资料时也要查看模板。
修改上传数量或大小时，也请同步调整 `StoryEditor.jsx` 的提示文字。

## 报价计算和手动修改的关系

- 柜体默认面积：长度 × 高度 ÷ 1,000,000。
- 石材默认面积：长度 × 宽度 ÷ 1,000,000。
- 柜体的 `areaOverride` 有值时使用手填面积；空字符串表示恢复公式，`0` 是有效手填值。
- 每行自动金额：生效面积 × `rate`，按两位小数计价。
- `amountOverride` 有值时优先使用手填金额，包括 `0`。
- 总价通常是各行金额合计；`totalPriceOverride` 有值时优先使用手填总价。
- 打印时金额、面积和文本输出普通文字；每平方米单价以及编辑按钮不打印。

新增字段时检查四处：默认数据、新增行工厂、编辑组件、计算或打印逻辑。
不要把公式写进 JSX 中；在计算模块修改，再为具体行为增加测试。

## 模块职责和依赖方向

```text
页面 / API 路由
  ├─ 页面组件 → 表单组件 / 公共配置
  ├─ 协议编辑器 → 保存钩子 → 浏览器存储
  │               └─ 纯计算函数
  └─ API 路由 → 业务处理 → 文件存储 / 媒体写入
```

- 页面负责组合组件；表单负责显示和编辑，保存操作由父组件传入。
- `lib/domain/projects.js` 负责项目字段校验和记录更新，不处理 HTTP 请求。
- `lib/server/stories.js` 负责案例流程；`media.js` 负责文件写入；`store.js` 负责 JSON 持久化。
- `handleStoryAction` 接受存储和上传适配器，测试可替换为内存实现。
- `src/app/useAgreementDocument.js` 负责一个协议的加载、迁移、字段更新和自动保存。
- `src/app/editorConfig.js` 登记协议的模板、界面、存储键和迁移规则。
- `src/utils/formatters.js` 是金额、日期和文件名格式化的唯一实现；旧路径保留兼容导出。

这里按 SOLID 的目的组织职责和依赖，没有为了“符合原则”增加类、继承树或大型框架。
新增功能优先放进对应模块；只有出现独立职责或重复行为时才继续拆分。

## 样式与打印

`app/site.css` 和 `src/styles/editor.css` 现在是样式入口，按固定顺序导入子文件。
拆分时保留了原来的规则顺序和覆盖关系。不要随意调整导入顺序。
现有样式仍有历史覆盖规则；修改某个选择器时，搜索全部样式文件，检查后面的规则是否覆盖它。

表单控件在 Windows 和 Mac 下打印效果可能不同。报价表使用 `no-print` 隐藏控件，
使用 `print-only` 输出文本，避免出现滚动条或数字箭头。新增字段也沿用此方式。

## 数据在哪里

- 协议：当前浏览器的 localStorage；重要协议导出 JSON 留存。
- 项目、案例：`DATA_DIR/workspace.json`，未设置时使用 `.data/workspace.json`。
- 上传图片视频：`DATA_DIR/media/`。
- `src/app/migrations.js`：旧协议转换；不要随意更换存储键或覆盖已有用户数据。
- `lib/server/store.js` 只支持单进程串行写入，多实例部署需要共享数据库。

## 修改后的检查

```sh
npm run format
npm run format:check
npm test
npm run build
npm run test:integration
npm audit
```

- `format`：统一缩进、换行和引号。
- `test`：报价、面积、手填覆盖、导入、同步、项目校验和案例流程测试。
- `build`：检查生产编译和所有路由。
- `test:integration`：启动临时本地服务器，使用随机测试账号和临时数据目录，测试登录、
  项目增删改、上传、草稿隐私、发布/取消发布、视频 Range 请求和退出；完成后清理。
  它会使用 `.next/dev`，运行前请停止同一目录正在运行的开发服务器。
- `smoke-test.mjs` 是底层检查脚本；通常运行上面的隔离命令即可，不要在真实生产数据上手动测试。

自动检查不等同于浏览器目视测试。改过排版后，请查看桌面、手机和打印预览，特别是 Windows 打印。

## 保留的旧入口

`index.html`、`vite.config.js`、`src/main.jsx` 是旧 Vite 入口，当前 npm 脚本不使用它们。
`lib/auth.ts` 是旧登录格式，现用认证在 `lib/server/auth.js`，不要修改错文件。
`docs/legacy-middleware.ts.txt` 仅为历史参考。这些文件保留原位，避免影响旧引用和资料。

不要修改 `node_modules/`、`.next/` 或把 `.env.local` 中的账号密钥放进公共配置。
