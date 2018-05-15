import React from 'react';

const Viewport = ({children}) => (
  <div className="viewport">
    <div className="camera position">
      <div className="camera rotation">
        {children}
      </div>
    </div>
  </div>
);

export default Viewport;
