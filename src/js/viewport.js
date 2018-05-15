import React from 'react';

const Viewport = ({children}) => (
  <div className="viewport">
    <div className="camera">
      {children}
    </div>
  </div>
);

export default Viewport;
