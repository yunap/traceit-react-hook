# traceit-react-hook

A lightweight npm package that provides a simple and efficient way to trace the execution of React hooks in your application.

## Installation

You can install `traceit-react-hook` using npm:

```
npm install traceit-react-hook
```

## Usage

To trace an element on the screen using the `traceit-react-hook`, follow these steps:

1. Import the `useTrace` hook from `traceit-react-hook`.
2. Create a ref using `useRef` for the element you want to trace.
3. Call the `useTrace` hook with the ref, hide and trace booleans, and any optional configuration.
4. Attach the ref to the element you want to trace.

Here's an example:

```jsx
import React, { useRef, useState } from 'react';
import { useTrace } from 'traceit-react-hook';

function MyComponent() {
  const elementRef = useRef(null);
  const [hide, setHide] = useState(false);
  const [trace, setTrace] = useState(true);
  
  useTrace(elementRef, hide, trace, {
    strokeWidth: 3,
    strokeColor: '#ff0000',
    gapPoint: 'top_right'
  });

  return (
    <>
      <div ref={elementRef} style={{ width: 200, height: 100, background: '#f0f0f0' }}>
        Element being traced
      </div>
      <button onClick={() => setHide(!hide)}>Toggle Hide</button>
      <button onClick={() => setTrace(!trace)}>Toggle Trace</button>
    </>
  );
}

```

## API

```jsx
        useTrace(elementRef, hide, trace, options);

        elementRef: React ref object pointing to the element to be traced
        options: (Optional) An object with the following properties:
                strokeWidth: Width of the trace line (default: 2)
                strokeColor: Color of the trace line (default: '#000000')
                strokeDasharray: Array specifying dash pattern (default: [])
                lineCap: Style of line endings ('butt', 'round', or 'square', default: 'round')
                gapPoint: Where the gap in the trace should be ('top', 'right', 'bottom', 'left', 'top_right', 'bottom_right', 'bottom_left', 'top_left', default: 'top')
                redrawSpeed: Speed of the redraw animation in milliseconds (default: 1000)
                fillOpacity: Opacity of the fill color (default: 0)
                fillColor: Color of the fill (default: 'none')
                canvasPadding: Padding around the traced element (default: 0)
                hide: Boolean to hide/show the trace (default: false)
                trace: Boolean to enable/disable tracing (default: true)
                onEndTrace: Callback function called when tracing ends
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/yunap/traceit-react-hook).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
