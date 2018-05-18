import React from 'react';

function translate3d (x, y, z) {
  return `translate3d(${x * 64}px, ${y * 64}px, ${z * 64}px)`;
}

const Block = ({x, y, z}) => (
  <div className="block" style={{transform: translate3d(x, y, z)}}>
    <div className="face front" />
    <div className="face back" />
    <div className="face left" />
    <div className="face right" />
    <div className="face top" />
    <div className="face bottom" />
  </div>
);

export default Block;
