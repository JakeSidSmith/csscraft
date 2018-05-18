import React from 'react';

function translate3d (x, y, z) {
  return `translate3d(${x * 64}px, ${y * 64}px, ${z * 64}px)`;
}

class Block extends React.PureComponent {
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

  render () {
    const {x, y, z} = this.props;

    return (
      <div className="block" style={{transform: translate3d(x, y, z)}}>
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
