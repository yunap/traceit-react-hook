import { useEffect, useState } from 'react';
import { generateEllipsePoints } from './utils/shapeMath';

const defaultOptions = {
    strokeColor: '#00ff00',
    strokeWidth: 2,
    strokeOpacity: 1,
    fillOpacity: 0,
    fillColor: null,
    strokeDasharray: null,
    lineCap: 'butt',
    gapPoint: 'top_right',
    redrawSpeed: 2500,
    canvasPadding: 10,
    onEndTrace: () => {},
    onClick: () => {},
};

// helper functions
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : null;
};

export const useTrace = (elementRef, hide, trace, options) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const [redraw, setRedraw] = useState(trace); // Add state to trigger redraw

    const handleClick = (e) => {
        const { onClick } = mergedOptions;
     //   e.preventDefault();
        onClick(e);
    };

    useEffect(() => {
        const element = elementRef.current;
        if (!element || hide) return;

        const setupCanvas = (canvas, element, mergedOptions) => {
            const padding = mergedOptions.canvasPadding;
            const { width, height } = element.getBoundingClientRect() || {};
          
            canvas.width = width + padding * 2;
            canvas.height = height + padding * 2;
            canvas.style.position = 'absolute';
            canvas.style.left = `-${parseInt(padding / 2)}px`;
            canvas.style.top = `-${parseInt(padding / 2)}px`;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;
          };

        const animateTrace = () => {
            const { strokeColor, strokeWidth, strokeOpacity, fillOpacity, fillColor, redrawSpeed, strokeDasharray, lineCap, onEndTrace } = mergedOptions;
            let start = null;

            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / redrawSpeed, 1);

                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
                ctx.save();
                ctx.beginPath();
    
                // Draw the shape based on progress
                const endPointIndex = Math.floor(percentage * controlPoints.length);
                for (let i = 0; i < endPointIndex - 1; i++) {
                    if (i === 0) {
                        ctx.moveTo(controlPoints[i].x, controlPoints[i].y);
                    } else {
                        const prevPoint = controlPoints[i - 1];
                        const midPoint = controlPoints[i];
                        const currPoint = controlPoints[i + 1];
                        
                        ctx.bezierCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y, currPoint.x, currPoint.y);
                    }
                }
        
                if( strokeDasharray ) {
                    ctx.setLineDash(strokeDasharray);
                }
                ctx.lineCap = lineCap;
                ctx.strokeStyle = `rgba(${hexToRgb(strokeColor)}, ${strokeOpacity})`;
                ctx.fillStyle = `rgba(${hexToRgb(fillColor ? fillColor : strokeColor)}, ${fillOpacity})`;
                ctx.lineWidth = strokeWidth;
                if (fillColor) {
                    ctx.fill();
                }
                ctx.stroke();
        
                if (progress < redrawSpeed) {
                    requestAnimationFrame(animate);
                } else {
                    onEndTrace();
                }
            }

            requestAnimationFrame(animate);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        setupCanvas(canvas, element, mergedOptions);
        const controlPoints = generateEllipsePoints(canvas.width, canvas.height, mergedOptions.canvasPadding, mergedOptions.gapPoint);

        animateTrace();

        // Add event listeners for click and resize events
        canvas.addEventListener('click', handleClick);
        window.addEventListener('resize', setRedraw);

        // Append canvas to body
        element.style.position = 'relative';
        element.appendChild(canvas);

        return () => {
            window.removeEventListener('resize', setRedraw);

            if (canvas) {
                canvas.removeEventListener('click', handleClick);
                element.removeChild(canvas);
            }
        };
    }, [trace, redraw, hide]);

    return null;
};


