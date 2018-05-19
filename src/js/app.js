import React from 'react';
import Viewport from './viewport';
import Block from './block';
import ToolBar from './tool-bar';

const createBlockId = (x, y, z) => `${parseInt(x, 10)}x${parseInt(y, 10)}x${parseInt(z, 10)}`;

const TOOLS = [
  {
    className: 'grass',
    component: Block
  }
];

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedBlockType: 'grass',
      blocks: {
        [createBlockId(0, 0, 0)]: 'grass'
      }
    };
  }

  addBlock = (x, y, z) => {
    const {blocks, selectedBlockType} = this.state;

    this.setState({
      blocks: {
        ...blocks,
        [createBlockId(x, y, z)]: selectedBlockType
      }
    });
  }

  removeBlock = (x, y, z) => {
    const {blocks} = this.state;
    const blockId = createBlockId(x, y, z);

    if (!(x === 0 && y === 0 && z === 0)) {
      delete blocks[blockId];

      this.setState({
        blocks
      });
    }
  }

  render () {
    const {blocks, selectedBlockType} = this.state;
    const blocksInfo = Object.keys(blocks).map((key) => {
      const [x, y, z] = key.split('x');

      return {
        key,
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        z: parseInt(z, 10),
        className: blocks[key]
      };
    });

    return (
      <div>
        <Viewport>
          {
            blocksInfo.map(({key, x, y, z, className}) => {
              return (
                <Block
                  key={key}
                  className={className}
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
        <ToolBar selectedBlockType={selectedBlockType} tools={TOOLS} />
      </div>
    );
  }
}

export default App;
