import React from 'react';

const faces = ['front', 'back', 'left', 'right', 'top', 'bottom']
  .map((value) => (
    <div key={value} className={`face ${value}`} />
  ));

function translate3d (x, y, z) {
  return `translate3d(${50 + x * 100}px, ${50 + y * 100}px, ${50 + z * 100}px)`;
}

const Block = ({x, y, z}) => (
  <div className="block" style={{transform: translate3d(x, y, z)}}>
    {faces}
  </div>
);

export default Block;
