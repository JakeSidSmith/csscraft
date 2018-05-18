import React from 'react';

class Viewport extends React.Component {
  constructor (props) {
    super(props);

    this.lastMouse = null;

    this.state = {
      x: 45,
      y: -45
    };
  }

  pivot (x, y) {
    return `rotateX(${y}deg) rotateY(${x}deg)`;
  }

  onMouseDown = (event) => {
    const {clientX, clientY} = event;

    this.lastMouse = {
      clientX,
      clientY
    };

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event) => {
    event.preventDefault();

    const {clientX, clientY} = event;

    if (this.lastMouse) {
      const {x, y} = this.state;

      this.setState({
        x: (x + clientX - this.lastMouse.clientX) % 360,
        y: Math.max(Math.min(y + this.lastMouse.clientY - clientY, 90), -90)
      });
    }

    this.lastMouse = {
      clientX,
      clientY
    };
  }

  onMouseUp = () => {
    this.lastMouse = null;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  render () {
    const { children } = this.props;
    const { x, y } = this.state;

    return (
      <div className="viewport" onMouseDown={this.onMouseDown}>
        <div className="camera" style={{transform: this.pivot(x, y)}}>
          {children}
        </div>
      </div>
    );
  }
}

export default Viewport;
