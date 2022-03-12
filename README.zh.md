# @bravejs/pagination

这是分页组件的基类。用于创建分页组件所需的最基本数据，以便它可以应用于任何场景或框架。基于这些数据，您可以轻松定义各种 UI 风格和交互。

[English](https://github.com/bravejs/pagination/blob/main/README.md)
| 简体中文

## 安装

使用 npm:

```
npm i @bravejs/pagination -S
```

## 语法

```typescript
import Pagination from '@bravejs/pagination'

// 创建
const pagination = new Pagination({
  current: 1,
  total: 100,
  pageSize: 50,
  maxLength: 9
})

// 使用数据
pagination.pages.forEach((page) => {
  console.log(page || '...')
})
```

## 接口

### Options

实例参数选项

```typescript
interface Options {
  // 当前页，默认 1
  current: number;

  // 总条目数量，默认 0
  total: number;

  // 每页条目树立，默认 50
  pageSize: number;

  // 最大页码长度, 
  // 当总页数超过该值时会折叠, 
  // 默认为 9
  maxLength: number;
}
```

### Props

实例属性，包括所有传入参数

```typescript
interface Props extends Options {
  totalPages: number; // 总页数
}
```

### Pagination

```typescript
declare class Pagination {
  pages: number[]; // 页码列表，0 为折叠项
  props: Props; // 实例属性

  constructor (options: Partial<Options>);

  /**
   * 跳转上一页的方法
   * 如果已经是第一页，该方法执行无效
   */
  prev (): void;

  /**
   * 跳转下一页的方法
   * 如果已经是最后一页，该方法执行无效
   */
  next (): void;

  /**
   * 跳转到指定页的方法.
   * 如果 `page` 是当前页或者超出范围，该方法执行无效
   */
  to (page: number): void;

  /**
   * 设置或者更新实例参数的方法
   */
  set (options: Partial<Options>): void;
}
```