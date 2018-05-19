import React from 'react';
import Viewport from './viewport';
import Block from './block';
import {Grass} from './blocks';

const createBlockId = (x, y, z) => `${parseInt(x, 10)}x${parseInt(y, 10)}x${parseInt(z, 10)}`;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      blocks: new Set([createBlockId(0, 0, 0)])
    };
  }

  addBlock = (x, y, z) => {
    const {blocks} = this.state;

    blocks.add(createBlockId(x, y, z));

    this.setState({
      blocks
    });
  }

  removeBlock = (x, y, z) => {
    const {blocks} = this.state;
    const blockId = createBlockId(x, y, z);

    if (!(x === 0 && y === 0 && z === 0)) {
      blocks.delete(blockId);

      this.setState({
        blocks
      });
    }
  }

  render () {
    const {blocks} = this.state;

    return (
      <div>
        <Viewport>
          {
            [...blocks].map((key) => {
              const [x, y, z] = key.split('x');

              return (
                <Grass
                  key={key}
                  x={parseInt(x, 10)}
                  y={parseInt(y, 10)}
                  z={parseInt(z, 10)}
                  addBlock={this.addBlock}
                  removeBlock={this.removeBlock}
                />
              );
            })
          }
        </Viewport>
        <div className="tool-bar-container">
          <div className="tool-bar">
            <div className="tool">
              <div className="tool-face" />
            </div>
            <div className="tool">
              <div className="tool-face" />
            </div>
            <div className="tool">
              <div className="tool-face" />
            </div>
            <div className="tool">
              <div className="tool-face" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
