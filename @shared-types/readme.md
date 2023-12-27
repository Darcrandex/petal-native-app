> 使用 [tsconfig.compilerOptions.paths](https://www.typescriptlang.org/tsconfig#paths) 来关联一个项目外部的类型定义

在多个项目中可以共用这些类型定义

**需要注意，这些内容只能导出类型定义，不能导出变量或者其他 js 代码功能**

## 如何使用

在你的子项目中，修改`tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      // 关联到此共享的文件夹
      // 注意文件路径
      "@shared-types/*": ["../@shared-types/*"]
    }
  }
}
```

在代码中引用

```typescript
import { SomeType } from "@shared-types/some-type.d.ts";
```
