import React from 'react';

const faces = ['front', 'back', 'left', 'right', 'top', 'bottom']
  .map((value) => (
    <div key={value} className={`face ${value}`} />
  ));

function translate3d (x, y, z) {
  return `translate3d(${x * 64}px, ${y * 64}px, ${z * 64}px)`;
}

const Block = ({x, y, z}) => (
  <div className="block" style={{transform: translate3d(x, y, z)}}>
    {faces}
  </div>
);

export default Block;
