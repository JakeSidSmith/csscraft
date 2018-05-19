import React from 'react';
import Viewport from './viewport';
import Block from './block';
import ToolBar from './tool-bar';

const createBlockId = (x, y, z) => `${parseInt(x, 10)}x${parseInt(y, 10)}x${parseInt(z, 10)}`;

const TOOLS = [
  {
    className: 'grass',
    component: Block
  },
  {
    className: 'stone',
    component: Block
  }
];

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedTool: TOOLS[0],
      blocks: {
        [createBlockId(0, 0, 0)]: TOOLS[0]
      }
    };
  }

  addBlock = (x, y, z) => {
    const {blocks, selectedTool} = this.state;

    this.setState({
      blocks: {
        ...blocks,
        [createBlockId(x, y, z)]: selectedTool
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

  selectTool = (selectedTool) => {
    this.setState({
      selectedTool
    });
  }

  render () {
    const {blocks, selectedTool} = this.state;
    const blocksInfo = Object.keys(blocks).map((key) => {
      const [x, y, z] = key.split('x');
      const block = blocks[key];

      return {
        key,
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        z: parseInt(z, 10),
        ...block
      };
    });

    return (
      <div>
        <Viewport>
          {
            blocksInfo.map(({key, x, y, z, className, component: Component}) => {
              return (
                <Component
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
        <ToolBar
          selectTool={this.selectTool}
          selectedTool={selectedTool}
          tools={TOOLS}
        />
      </div>
    );
  }
}

export default App;
