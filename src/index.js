import React from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";

class DynamicOverflow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfVisibleElements: Infinity
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    /*
     * All elements in props.list are rendered on the screen.
     *
     * Then, the containerNode and tabNode are measured to calculate how many
     * elements we can display.
     *
     * If elements need to be hidden, everything is rerendered.
     */
    this.calculateSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  calculateSize = () => {
    const containerWidth = this.containerNode && this.containerNode.clientWidth;
    const firstChildWidth = this.tabNode && this.tabNode.clientWidth;

    const maximumChildrenAllowed =
      Math.floor(containerWidth / firstChildWidth) - 1;
    const currentChildrenCount = this.props.list({}).length;

    let numberOfVisibleElements = Infinity;
    if (currentChildrenCount > maximumChildrenAllowed) {
      // by default, one element is always shown
      numberOfVisibleElements = Math.max(maximumChildrenAllowed, 1);
    }

    this.setState({ numberOfVisibleElements });
  };

  handleResize = throttle(this.calculateSize, this.props.throttle);

  containerRef = node => {
    if (!this.containerNode) {
      this.containerNode = node;
    }
  };

  tabRef = node => {
    if (!this.tabNode) {
      this.tabNode = node;
    }
  };

  render() {
    const { numberOfVisibleElements } = this.state;
    const { list, children } = this.props;
    const { containerRef, tabRef } = this;

    const elements = list({ tabRef });
    const visibleElements = elements.slice(0, numberOfVisibleElements);
    const overflowElements = elements.slice(numberOfVisibleElements);

    return children({
      visibleElements,
      overflowElements,
      containerRef
    });
  }
}

DynamicOverflow.propTypes = {
  children: PropTypes.func,
  list: PropTypes.func,
  throttle: PropTypes.number
};

DynamicOverflow.defaultProps = {
  throttle: 200
};

export default DynamicOverflow;
