import React from 'react';

class Viewport extends React.Component {
  constructor (props) {
    super(props);

    this.lastMouse = null;
    this.lastPinch = null;

    this.state = {
      x: 45,
      y: -45,
      distance: 0
    };
  }

  componentDidMount () {
    window.addEventListener('wheel', this.onWheel);
  }

  transform (x, y, distance) {
    return `translate3d(0, 0, ${distance}px) rotateX(${y}deg) rotateY(${x}deg)`;
  }

  distance (x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  onWheel = (event) => {
    const {deltaY} = event;
    const {distance} = this.state;

    this.setState({
      distance: Math.max(Math.min(distance - deltaY, 0), -1000)
    });
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

      this.lastMouse = {
        clientX,
        clientY
      };
    }
  }

  onMouseUp = () => {
    this.lastMouse = null;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onTouchStart = (event) => {
    if (event.touches && event.touches.length === 2) {
      const [{clientX: x1, clientY: y1}, {clientX: x2, clientY: y2}] = event.touches;

      const pinch = this.distance(x1, y1, x2, y2);

      this.lastPinch = pinch;
    } else {
      const [{clientX, clientY}] = event.touches;

      this.lastMouse = {
        clientX,
        clientY
      };
    }

    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchMove = (event) => {
    event.preventDefault();

    if (event.touches) {
      const [{clientX, clientY}] = event.touches;

      if (this.lastPinch && event.touches && event.touches.length === 2) {
        const {distance} = this.state;
        const [{clientX: x1, clientY: y1}, {clientX: x2, clientY: y2}] = event.touches;

        const pinch = this.distance(x1, y1, x2, y2);

        this.setState({
          distance: Math.max(Math.min(distance + (pinch - this.lastPinch) * 5, 0), -1000)
        });

        this.lastPinch = pinch;
      } else if (this.lastMouse) {
        const {x, y} = this.state;

        this.setState({
          x: (x + clientX - this.lastMouse.clientX) % 360,
          y: Math.max(Math.min(y + this.lastMouse.clientY - clientY, 90), -90)
        });

        this.lastMouse = {
          clientX,
          clientY
        };
      }
    }
  }

  onTouchEnd = () => {
    this.lastPinch = null;

    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  render () {
    const { children } = this.props;
    const { x, y, distance } = this.state;

    return (
      <div className="viewport" onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}>
        <div className="camera" style={{transform: this.transform(x, y, distance)}}>
          {children}
        </div>
      </div>
    );
  }
}

export default Viewport;
