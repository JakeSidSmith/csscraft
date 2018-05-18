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

  addBlock = (x, y, z) => {
    const {blocks} = this.state;

    this.setState({
      blocks: blocks.add(`${parseInt(x, 10)}x${parseInt(y, 10)}x${parseInt(z, 10)}`)
    });
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
                x={parseInt(x, 10)}
                y={parseInt(y, 10)}
                z={parseInt(z, 10)}
                addBlock={this.addBlock}
              />
            );
          })
        }
      </Viewport>
    );
  }
}

export default App;
