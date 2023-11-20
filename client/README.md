## pnpm 启动的问题

pnpm 会导致无法启动; 解决方法, 在根目录新建 .npmrc 文件

```
// .npmrc
node-linker = hoisted
```

## alias 配置失效问题

根据官方文档提供的信息, 进行配置; 但在 web 模式会报错, 还需要在 babel 中进行相同的配置

```json
// bebel.config.js

{
  "plugins": [["module-resolver", { "alias": { "@": "./src" } }]]
}
```
