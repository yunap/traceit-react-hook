import { useEffect, useState, useRef } from 'react';
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
    onClick: null,
};

// helper functions
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : null;
};

export const useTrace = (elementRef, trace, options) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const [redraw, setRedraw] = useState(trace);
    const isResizing = useRef(false);

    const handleClick = (e) => {
        const { onClick } = mergedOptions;
        if (typeof onClick === 'function') {
            e.preventDefault();
            onClick(e);
        }
    };

    useEffect(() => {
        const element = elementRef.current;
        if (!element || !trace) return;

        const setupCanvas = (canvas, element, mergedOptions) => {
            const padding = mergedOptions.canvasPadding;
            const { width, height } = element.getBoundingClientRect() || {};
        
            canvas.width = width + padding * 2;
            canvas.height = height + padding * 2;
            canvas.style.position = 'absolute';
            canvas.style.left = `-${parseInt(padding)}px`;
            canvas.style.top = `-${parseInt(padding)}px`;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;
            // Set pointer-events to 'none' only if onClick is a function
            canvas.style.pointerEvents = typeof mergedOptions.onClick === 'function' ? 'auto' : 'none';
      
        };

        const animateTrace = () => {
            const { strokeColor, strokeWidth, strokeOpacity, fillOpacity, fillColor, redrawSpeed, strokeDasharray, lineCap, onEndTrace } = mergedOptions;
            let start = null;

            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const currentRedrawSpeed = isResizing.current ? 1 : redrawSpeed;
                const percentage = Math.min(progress / currentRedrawSpeed, 1);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.beginPath();
    
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
        
                if (strokeDasharray) {
                    ctx.setLineDash(strokeDasharray);
                }
                ctx.lineCap = lineCap;
                ctx.strokeStyle = `rgba(${hexToRgb(strokeColor)}, ${strokeOpacity})`;
                ctx.fillStyle = `rgba(${hexToRgb(fillColor && fillOpacity ? fillColor : strokeColor)}, ${fillOpacity})`;
                ctx.lineWidth = strokeWidth;
                if (fillColor) {
                    ctx.fill();
                }
                ctx.stroke();
        
                if (progress < currentRedrawSpeed) {
                    requestAnimationFrame(animate);
                } else {
                    if (typeof onEndTrace === 'function') {
                        onEndTrace();
                    }
                    isResizing.current = false;
                }
            }

            requestAnimationFrame(animate);
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        setupCanvas(canvas, element, mergedOptions);
        const controlPoints = generateEllipsePoints(canvas.width, canvas.height, mergedOptions.canvasPadding, mergedOptions.gapPoint);

        animateTrace();

        const handleResize = () => {
            isResizing.current = true;
            setRedraw(prev => !prev);
            console.log('useTrace: handleResize');
        };

        canvas.addEventListener('click', handleClick);
        window.addEventListener('resize', handleResize);

        const styles = getComputedStyle(element)
        element.style.position = styles.position !== 'absolute' ? 'relative' : element.style.position;
        element.style.overflow = 'visible';
        element.appendChild(canvas);

        return () => {
            window.removeEventListener('resize', handleResize);

            if (canvas) {
                canvas.removeEventListener('click', handleClick);
                element.removeChild(canvas);
            }
        };
    }, [trace, redraw]);

    return null;
};