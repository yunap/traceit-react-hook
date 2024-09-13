import React, { useRef, useState } from 'react';
import { useTrace } from '../useTrace.js';
import { fn } from '@storybook/test';
import { TraceDemoComponent } from './TraceDemoComponent';
import './trace.css';

const meta = {
  title: 'useTrace Custom Hook',
  component: TraceDemoComponent,
  tags: ['autodocs'],
  argTypes: {
    strokeWidth: { control: 'number' },
    strokeColor: { control: 'color' },
    trace: { control: 'boolean' },
  },
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
};

export default meta;

export const Default = {
  args: {
    trace: true,
  },
};

export const StrokeWidthAndColor = {
  args: {
      strokeWidth: '5',
      strokeColor: '#ee0000',
      strokeDasharray: [10, 5, 2, 5],
      lineCap: 'round',
      trace: true,
  },
};

export const GapPoint = {
  args: {
    strokeWidth: '3',
    strokeColor: '#0000ee',
    gapPoint: "left",
    trace: true
  },
};

export const RedrawSpeed = {
  args: {
      redrawSpeed: 1200,
      strokeWidth: '4',
      strokeColor: '#222222',
      gapPoint: 'bottom_left',
      trace: true,
  },
};

export const FillOpacityAndColor = {
  args: {
          fillOpacity: 0.3,
          fillColor: '#ffd633',
          strokeWidth: '4',
          strokeColor: '#f3a220',
          gapPoint: 'top_left',
          trace: true,
  },
};

const handleClick = () => {
  alert('Element Clicked!');
};

export const OnClick = {
  args: {
      onClick: handleClick,
      strokeWidth: '4',
      strokeColor: '#3bcdd1',
      fillOpacity: 0.3,
      fillColor: '#ffd633',
      gapPoint: 'bottom_left',
      trace: true,
  },
};

const handleEndTrace = () => {
  alert('Trace Ended!');
};

export const OnEndTrace = {
  args: {
      onEndTrace: handleEndTrace,
      strokeWidth: '4',
      strokeColor: '#50289f',
      gapPoint: 'top',
      trace: true,
  },
};

export const HideTrace = {
  args: {
      strokeWidth: '4',
      strokeColor: '#009900',
      gapPoint: 'top_left',
      trace: false,
  },
};

export const ClickThroughCanvas = {
  args: {
    strokeWidth: '4',
    strokeColor: '#ff6600',
    fillOpacity: 0.2,
    fillColor: '#ffcc00',
    gapPoint: 'right',
    trace: true,
  },
};