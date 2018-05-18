import React from 'react';
import Viewport from './viewport';
import Block from './block';

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
