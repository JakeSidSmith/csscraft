import React from 'react';
import Viewport from './viewport';
import Block from './block';

const BLOCKS_PER_AXIS = 8;

const blocks = Array(BLOCKS_PER_AXIS).fill(null).map((valueZ, z) => {
  return Array(BLOCKS_PER_AXIS).fill(null).map((valueX, x) => {
    const y = 2 + Math.floor(Math.random() * 2);

    return (
      <Block
        key={`x=${x}y=${y}z=${z}`}
        x={x - BLOCKS_PER_AXIS / 2}
        y={y}
        z={z - BLOCKS_PER_AXIS / 2}
      />
    );
  });
});

const App = () => (
  <Viewport>
    {blocks}
  </Viewport>
);

export default App;
