import React from 'react';

const faces = ['front', 'back', 'left', 'right', 'top', 'bottom']
  .map((value) => (
    <div key={value} className={`face ${value}`} />
  ));

const Block = () => (
  <div className="block">
    {faces}
  </div>
);

export default Block;
