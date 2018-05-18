import React from 'react';
import {getDistance, translate3d} from './utils';

const MOVE_THRESHOLD = 5;

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

  onMouseDown = () => {
    this.timeout = window.setTimeout(() => {
      const {x, y, z, removeBlock} = this.props;

      removeBlock(x, y, z);
    }, 500);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event) => {
    const {clientX, clientY} = event;

    if (
      this.downMouse !== null &&
      getDistance(clientX, clientY, this.downMouse.clientX, this.downMouse.clientY) > MOVE_THRESHOLD
    ) {
      window.clearTimeout(this.timeout);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseUp = () => {
    window.clearTimeout(this.timeout);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  render () {
    const {x, y, z} = this.props;

    return (
      <div
        className="block"
        style={{transform: translate3d(x, y, z)}}
        onMouseDown={this.onMouseDown}
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
