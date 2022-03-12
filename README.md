# @bravejs/pagination

This is the base class for pagination components. It is used to create the most basic data required for pagination
components, so that it can be applied to any scene or framework. Based on this data, you can easily define various UI
styles and interactions.

English |
[简体中文](https://github.com/bravejs/pagination/blob/main/README.zh.md)

## Install

Using npm:

```
npm i @bravejs/pagination -S
```

## Syntax

```typescript
import Pagination from '@bravejs/pagination'

// create
const pagination = new Pagination({
  current: 1,
  total: 100,
  pageSize: 50,
  maxLength: 9
})

// usage data
pagination.pages.forEach((page) => {
  console.log(page || '...')
})
```

## Interface

### Options

Instance parameter options.

```typescript
interface Options {
  // Current page, default 1
  current: number;

  // Total number of entries, default 0
  total: number;

  // Number of entries per page, default 50
  pageSize: number;

  // The maximum number of page numbers, 
  // which will be collapsed when it exceeds this value, 
  // the default is 9
  maxLength: number;
}
```

### Props

Instance properties, including all incoming parameters.

```typescript
interface Props extends Options {
  totalPages: number; // total pages
}
```

### Pagination

Pagination instance and methods

```typescript
declare class Pagination {
  pages: number[]; // List of page numbers, 0 is a collapsed item
  props: Props; // instance properties

  constructor (options: Partial<Options>);

  /**
   * The method of jumping to the previous page.
   * If it is already the first page, this method is invalid.
   */
  prev (): void;

  /**
   * The method of jumping to the next page.
   * If it is already the last page, this method is invalid.
   */
  next (): void;

  /**
   * The method of jumping to the specified page.
   * If the `page` is the current page or is out of range, this method is invalid.
   */
  to (page: number): void;

  /**
   * Methods to set or update instance parameters
   */
  set (options: Partial<Options>): void;
}
```