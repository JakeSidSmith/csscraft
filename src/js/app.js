import React from 'react';
import Viewport from './viewport';
import Block from './block';

// const BLOCKS_PER_AXIS = 8;

// const blocks = Array(BLOCKS_PER_AXIS).fill(null).map((valueZ, z) => {
//   return Array(BLOCKS_PER_AXIS).fill(null).map((valueX, x) => {
//     const y = Math.floor(Math.random() * 2);

//     return (
//       <Block
//         key={`x=${x}y=${y}z=${z}`}
//         x={x - BLOCKS_PER_AXIS / 2}
//         y={y}
//         z={z - BLOCKS_PER_AXIS / 2}
//       />
//     );
//   });
// });

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      blocks: new Set(['0x0x0'])
    };
  }
  render () {
    const {blocks} = this.state;

    return (
      <Viewport>
        {
          [...blocks].map((key) => {
            const [x, y, z] = key.split('x');

            return (
              <Block
                key={key}
                x={x}
                y={y}
                z={z}
              />
            );
          })
        }
      </Viewport>
    );
  }
}

export default App;
