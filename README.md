[![Travis build status][travis-badge]][travis-build]
[![Codecov branch][codecov-badge]][codecov]
[![npm][npm-badge]][npm-version]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][license]

[![gzip size][gzip-badge]][unpkg]
[![size][size-badge]][unpkg]

[![Maintainability][code-climate-badge]][code-climate]
[![PRs Welcome][pull-request-badge]](http://makeapullrequest.com)

# react-dynamic-overflow
A React component that lets you know what elements are overflowing.

# Getting started
```shell
npm install --save react-dynamic-overflow
```

# Why?
`react-dynamic-overflow` is used for a specific UI pattern.

Imagine you are displaying 1 row of tabs.

```
+-------+-------+--------+--------+--------+
| Tab 1 | Tab 2 |  Tab 3 |  Tab 4 |  Tab 5 |
+-------+-------+--------+--------+--------+
```

When the page gets smaller, the 1 row of tabs may overflow into a second row.

```
+-------+-------+--------+
| Tab 1 | Tab 2 |  Tab 3 |
+-------+-------+--------+
| Tab 4 | Tab 5 |
+-------+-------+
```

What if we don't want a second row, and instead display a button that toggles those overflowing elements?

```
+-------+-------+--------+
| Tab 1 | Tab 2 |  More  |
+-------+-------+--------+

// Clicking on the More button...
+-------+-------+--------+
| Tab 1 | Tab 2 |  More  |
+-------+-------+--------+
                |  Tab 3 |
                +--------+
                |  Tab 4 |
                +--------+
                |  Tab 5 |
                +--------+
```

`react-dynamic-overflow` gives you an API that tells you what elements are visible and which have overflowed.

```jsx
import React from "react";
import DynamicOverflow from "react-dynamic-overflow";

const Example = () => (
  <DynamicOverflow
    list={({ nodeRef }) => ([
      <SomeTab ref={nodeRef} key={0}>Tab 1</SomeTab>,
      <SomeTab ref={nodeRef} key={1}>Tab 2</SomeTab>,
      <SomeTab ref={nodeRef} key={2}>Tab 3</SomeTab>,
      <SomeTab ref={nodeRef} key={3}>Tab 4</SomeTab>,
      <SomeTab ref={nodeRef} key={4}>Tab 5</SomeTab>,
    ])}
  >
  {
    ({ visibleElements, overflowElements, containerRef, moreNodeRef }) => {
      return (
        <div ref={containerRef}>
          {visibleElements}

          <div>
            {overflowElements}
          </div>
        </div>
      );
    }
  }
  </DynamicOverflow>
);
```

# API

| Props | Description | Default |
| ----- | ----------- | ------- |
| [children](#children-function) | (**Function**) [A render prop](https://reactjs.org/docs/render-props.html) function | None. This is required |
| [list](#list-function) | (**Function**) A function that returns an array of elements that will be rendered | None. This is required |
| throttle | (**Number**) A number (in milliseconds) in which the resize window event will be throttled | 200 |

## children function
The `children` prop is a function that is called with the following arguments.

| Name | Description |
| ---- | ----------- |
| visibleElements | An array of elements from the `list` props which are visible. The first element will always be visible. |
| overflowElements | An array of elements from the `list` props which are overflowed. |
| containerRef | A [ref](https://reactjs.org/docs/refs-and-the-dom.html) function that should be added to the parent element. This element, combined with the `nodeRef` and `moreNodeRef`, will be used in determining which elements are overflowed. |
| moreNodeRef | A [ref](https://reactjs.org/docs/refs-and-the-dom.html) function that should be added to the more element. This element, combined with the `containerRef` and `nodeRef`, will be used in determining which elements are overflowed. |

## list function
The `list` prop is a function that is called with the following argument.

| Name | Description |
| ---- | ----------- |
| nodeRef | A [ref](https://reactjs.org/docs/refs-and-the-dom.html) function that should be added to an element. This element, combined with the `containerRef` and `moreNodeRef`, will be used in determining which elements are overflowed. |

# Demo
See this [CodeSandbox demo](https://codesandbox.io/s/8zo29vnjr2).

[codecov]: https://codecov.io/gh/newyork-anthonyng/react-dynamic-overflow
[codecov-badge]: https://img.shields.io/codecov/c/github/newyork-anthonyng/react-dynamic-overflow/master.svg
[code-climate]: https://codeclimate.com/github/newyork-anthonyng/react-dynamic-overflow/maintainability
[code-climate-badge]: https://api.codeclimate.com/v1/badges/faefec967ef40a030c3e/maintainability
[downloads-badge]: https://img.shields.io/npm/dm/react-dynamic-overflow.svg?style=flat-square
[license]: https://github.com/newyork-anthonyng/react-dynamic-overflow/blob/master/LICENSE
[license-badge]: https://img.shields.io/npm/l/react-dynamic-overflow.svg?style=flat-square
[npmcharts]: https://npmcharts.com/compare/react-dynamic-overflow
[npm-version]:https://www.npmjs.com/package/react-dynamic-overflow
[npm-badge]: https://img.shields.io/npm/v/react-dynamic-overflow.svg?style=flat-square
[pull-request-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[travis-badge]: https://travis-ci.org/newyork-anthonyng/react-dynamic-overflow.svg?branch=master
[travis-build]: https://travis-ci.org/newyork-anthonyng/react-dynamic-overflow
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-dynamic-overflow?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-dynamic-overflow?label=size&style=flat-square
[unpkg]: https://unpkg.com/react-dynamic-overflow
