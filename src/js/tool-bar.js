import classNames from 'classnames';
import React from 'react';

class ToolBar extends React.Component {
  render () {
    const {tools, selectedBlockType} = this.props;

    return (
      <div className="tool-bar-container">
        <div className="tool-bar">
          {
            tools.map(({className}) => (
              <div
                key={className}
                className={classNames('tool', className, selectedBlockType === className && 'active')}
              >
                <div className="tool-face" />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ToolBar;
