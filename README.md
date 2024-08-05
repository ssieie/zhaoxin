## 我的博客的前端仓库

#### apps/web 前台前端项目

使用 vue3 + unocss + ts 等vue配套库开发

#### apps/admin 后台前端项目

使用 vue3 + ant-design-vue + ts 等vue配套库开发

#### packages/components

 一些公用组件目前还没有

#### packages/utils

一些公用方法

------

pnpm dev 启动前台开发预览

pnpm dev-admin 启动前台开发预览

pnpm build 打包前台前端到 build/web 路径下

pnpm build-admin 打包后台前端到 build/admin路径下

------

.drone.yml

drone的配置文件，实现前端 CI/CD ，push代码自动发布前后台前端。