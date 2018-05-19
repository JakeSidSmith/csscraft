import React from 'react';
import Tool from './tool';

class ToolBar extends React.Component {
  render () {
    const {tools, selectedTool, selectTool} = this.props;

    return (
      <div className="tool-bar-container">
        <div className="tool-bar">
          {
            tools.map((tool) => (
              <Tool
                key={tool.className}
                tool={tool}
                selectedTool={selectedTool}
                selectTool={selectTool}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default ToolBar;
