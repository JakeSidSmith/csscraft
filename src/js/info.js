import classNames from 'classnames';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Info extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.setState({
        open: true
      });
    }, 200);
  }

  onClickCloseInfo = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render () {
    const {open} = this.state;

    /* eslint-disable max-len */
    return (
      <TransitionGroup className="info-wrapper">
        {
          !open && (
            <CSSTransition timeout={200} classNames="fade">
              <div className="info-icon" onClick={this.onClickCloseInfo}>
                ?
              </div>
            </CSSTransition>
          )
        }

        {
          open && (
            <CSSTransition timeout={200} classNames="fade">
              <div className="info-overlay" onClick={this.onClickCloseInfo}>
                <div className="modal-table">
                  <div className="modal-cell">
                    <div className="modal">
                      <h1>
                        Welcome!
                      </h1>

                      <h2>
                        About
                      </h2>

                      <p>
                        This began as an experiment to see how easy it would be, and if it was plausible, to use purely CSS as a rendering engine for a Minecraft-like scene.
                      </p>
                      <p>
                        It turns out, it's quite easy to render some blocks, but the frame rate drops considerably when you add a hundred or so.
                      </p>
                      <p>
                        Then I figured, why not add some javascript and make it interactive?
                      </p>
                      <p>
                        The final CSSCraft just renders a single block, and allows the user to build whatever they want on top of this.
                      </p>

                      <h2>
                        Controls
                      </h2>

                      <ol>
                        <li>
                          Click / tap on the side of a block to add another
                        </li>
                        <li>
                          Click / press and hold on a block to destroy it (you cannot destroy the initial block)
                        </li>
                        <li>
                          You can switch blocks with the tool bar at the bottom (which is scrollable on smaller screens)
                        </li>
                        <li>
                          Click / press and drag to rotate the screen
                        </li>
                        <li>
                          Scroll / pinch to zoom
                        </li>
                      </ol>

                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          )
        }
      </TransitionGroup>
    );
    /* eslint-enable max-len */
  }
}

export default Info;
