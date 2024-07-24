import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTrace } from '../useTrace.js';
import './button.css';

/**
 * Primary UI component for user interaction
 */
const TraceDemo = ({ ...props }) => {
  const elementRef = useRef(null);
  const { hide, trace } = props;

  useTrace(elementRef, hide, trace, props);

  return (
    <div ref={elementRef} className="element-to-trace">
      <h2>This is the element to be traced</h2>
    </div>
  );
};

const RenderingControls = ({
  children,
}) => {
  const [key, setKey] = useState(1);

  return (
    <div key={key}>
      {children}
      <div>
      <hr />
        <button onClick={() => setKey(x => x + 1)} className="demo-remount-button">
          Remount Hook
        </button>
      </div>
    </div>
  );
};

export const TraceDemoComponent = (props) => {
  const { hide, onClick } = props;
  return (
  <RenderingControls>
   {hide && <div className="trace-comment">Trace is hidden, modify "hide" control to trigger the trace</div>}
   {onClick && <div className="trace-comment">Click the trace to trigger the onClick event</div>}
    <TraceDemo {...props} />
  </RenderingControls>
)};

/*
ButtonTst.propTypes = {
  /**
   * Is this the principal call to action on the page?
   *
  hide: PropTypes.bool,
  trace: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonTst.defaultProps = {
  hide: false,  
  trace: false, 
  onClick: undefined,
};
*/


  //   strokeColor: '#00aa33', // Set the stroke color to blue
  //   strokeWidth: 5, // Increase the stroke width
  //   gapPoint: 'right', // Change the gap point location to bottom-right
  //   redrawSpeed: 3000, // Adjust the redraw speed (in milliseconds)
  //   onEndTrace: () => console.log('Trace animation completed!'), // Callback function when trace animation ends
  //   onClick: (e) => console.log('Clicked on the trace!', e), // Callback function when the trace is clicked
  
