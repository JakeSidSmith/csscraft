import classNames from 'classnames';
import React from 'react';

class Tool extends React.Component {
  onClick = () => {
    const {tool, selectTool} = this.props;

    selectTool(tool);
  }

  render () {
    const {tool, selectedTool} = this.props;

    return (
      <div
        key={tool.className}
        className={classNames('tool', tool.className, selectedTool === tool && 'active')}
        onClick={this.onClick}
      >
        <div className="tool-face" />
      </div>
    );
  }
}

export default Tool;
