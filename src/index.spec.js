import React from "react";
import { shallow, mount } from "enzyme";
import DynamicOverflow from "./";

const defaultProps = {
  list: ({ tabRef }) => {
    return [
      <span
        key={0}
        ref={() => {
          tabRef({ clientWidth: 100 });
        }}
      >
        First tab
      </span>,
      <span key={1}>Second tab</span>,
      <span key={2}>Third tab</span>
    ];
  },
  throttle: 123
};

const events = {};

beforeEach(() => {
  window.addEventListener = jest.fn(
    (eventName, cb) => (events[eventName] = cb)
  );
  window.removeEventListener = jest.fn(
    eventName => (events[eventName] = undefined)
  );
});

afterEach(() => {
  window.addEventListener.mockClear();
  window.removeEventListener.mockClear();
});

it("should call children function with correct arguments when all elements can be visible", () => {
  const mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef({ clientWidth: 1000 })}>{visibleElements}</div>
  ));
  const wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );

  expect(mockChildFunction.mock.calls).toMatchSnapshot();
});

it("should always call children function with one element", () => {
  const mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef({ clientWidth: 0 })}>{visibleElements}</div>
  ));
  const wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );

  expect(mockChildFunction.mock.calls).toMatchSnapshot();
});

it("should call children function with correct arguments when some elements are hidden", () => {
  const mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef({ clientWidth: 300 })}>{visibleElements}</div>
  ));
  const wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );

  expect(mockChildFunction.mock.calls).toMatchSnapshot();
});

it("should add event listener when mounting", () => {
  const mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef({ clientWidth: 300 })}>{visibleElements}</div>
  ));
  const wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );

  const resizeEventListener = window.addEventListener.mock.calls.find(
    event => event[0] === "resize"
  );
  expect(resizeEventListener).toMatchSnapshot();
});

it("should remove event listener when unmounting", () => {
  const mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef({ clientWidth: 300 })}>{visibleElements}</div>
  ));
  const wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );
  wrapper.unmount();

  const resizeEventListener = window.removeEventListener.mock.calls.find(
    event => event[0] === "resize"
  );
  expect(resizeEventListener).toMatchSnapshot();
});

it("should recalculate visible elements when resizing window", () => {
  const containerNode = { clientWidth: 1000 };
  let mockChildFunction = jest.fn(({ visibleElements, containerRef }) => (
    <div ref={() => containerRef(containerNode)}>{visibleElements}</div>
  ));
  let wrapper = mount(
    <DynamicOverflow {...defaultProps}>{mockChildFunction}</DynamicOverflow>
  );

  mockChildFunction.mockClear();

  containerNode.clientWidth = 0;
  events.resize();
  expect(mockChildFunction).toHaveBeenCalledTimes(1);
  expect(mockChildFunction.mock.calls[0]).toMatchSnapshot();
});
