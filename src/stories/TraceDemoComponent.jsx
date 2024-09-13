import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTrace } from '../useTrace.js';
import './button.css';

/**
 * Primary UI component for user interaction
 */
const TraceDemo = ({ ...props }) => {
  const elementRef = useRef(null);
  const { trace } = props;

  useTrace(elementRef, trace, props);

  const handleElementClick = () => {
    if (!props.onClick) {
      alert('Underlying element clicked!');
    }
  };

  return (
    <div ref={elementRef} className="element-to-trace" onClick={handleElementClick}>
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
  const { trace, onClick } = props;
  return (
  <RenderingControls>
   {!trace && <div className="trace-comment">Trace is hidden, modify "trace" control to trigger the trace</div>}
   {onClick && <div className="trace-comment">Click the trace to trigger the onClick event</div>}
   {!onClick && trace && <div className="trace-comment">Click the element to trigger the underlying element's click event</div>}
    <TraceDemo {...props} />
  </RenderingControls>
)};