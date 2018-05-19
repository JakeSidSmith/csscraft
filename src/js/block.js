import classNames from 'classnames';
import React from 'react';
import {getDistance, translate3d} from './utils';

const MOVE_THRESHOLD = 5;
const HOLD_TIME = 500;

class Block extends React.Component {
  constructor (props) {
    super(props);

    this.downMouse = null;
  }

  onFrontClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x, y, z + 1);
  }

  onBackClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x, y, z - 1);
  }

  onLeftClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x - 1, y, z);
  }

  onRightClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x + 1, y, z);
  }

  onTopClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x, y - 1, z);
  }

  onBottomClick = () => {
    const {x, y, z, addBlock} = this.props;
    addBlock(x, y + 1, z);
  }

  onMouseDown = (event) => {
    const {clientX, clientY} = event;

    this.downMouse = {
      clientX,
      clientY
    };

    this.timeout = window.setTimeout(() => {
      const {x, y, z, removeBlock} = this.props;

      removeBlock(x, y, z);
    }, HOLD_TIME);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event) => {
    const {clientX, clientY} = event;

    event.preventDefault();

    if (
      this.downMouse !== null &&
      getDistance(clientX, clientY, this.downMouse.clientX, this.downMouse.clientY) > MOVE_THRESHOLD
    ) {
      this.downMouse = null;
      window.clearTimeout(this.timeout);

      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseUp = () => {
    this.downMouse = null;
    window.clearTimeout(this.timeout);

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onTouchStart = (event) => {
    const [{clientX, clientY}] = event.touches;

    this.downMouse = {
      clientX,
      clientY
    };

    if (event.touches && event.touches.length > 1) {
      this.downMouse = null;
      window.clearTimeout(this.timeout);

      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd);
    } else {
      this.timeout = window.setTimeout(() => {
        const {x, y, z, removeBlock} = this.props;

        removeBlock(x, y, z);
      }, HOLD_TIME);

      window.addEventListener('touchmove', this.onTouchMove);
      window.addEventListener('touchend', this.onTouchEnd);
    }
  }

  onTouchMove = (event) => {
    const [{clientX, clientY}] = event.touches;

    event.preventDefault();

    if (
      (
        this.downMouse !== null &&
        getDistance(clientX, clientY, this.downMouse.clientX, this.downMouse.clientY) > MOVE_THRESHOLD
      ) || event.touches && event.touches.length > 1
    ) {
      this.downMouse = null;
      window.clearTimeout(this.timeout);

      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd);
    }
  }

  onTouchEnd = () => {
    this.downMouse = null;
    window.clearTimeout(this.timeout);

    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  render () {
    const {x, y, z, className} = this.props;

    return (
      <div
        className={classNames('block', className)}
        style={{transform: translate3d(x, y, z)}}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      >
        <div onClick={this.onFrontClick} className="face front" />
        <div onClick={this.onBackClick} className="face back" />
        <div onClick={this.onLeftClick} className="face left" />
        <div onClick={this.onRightClick} className="face right" />
        <div onClick={this.onTopClick} className="face top" />
        <div onClick={this.onBottomClick} className="face bottom" />
      </div>
    );
  }
}

export default Block;
