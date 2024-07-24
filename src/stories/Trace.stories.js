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
    hide: { control: 'boolean' },
  },
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
};

export default meta;

export const Default = {
  args: {
    hide: false,
    trace: true,
  },
};


export const StrokeWidthAndColor = {
  args: {
      strokeWidth: '5',
      strokeColor: '#ee0000',
      strokeDasharray: [10, 5, 2, 5], // dash pattern with 10px line, 5px gap, 2px line, and 5px gap, repeating.
      lineCap: 'round',
      trace: true,
  },
};

export const GapPoint = {
  args: {
      strokeWidth: '3',
      strokeColor: '#0000ee',
      gapPoint: 'bottom_right',
      trace: true,
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

export const OnEndTrace = {
  args: {
      onEndTrace: fn(),
      onClick: handleClick,
      strokeWidth: '4',
      strokeColor: '#50289f',
      gapPoint: 'top',
      trace: true,
  },
};


export const HideTrace = {
  args: {
      hide: true,
      strokeWidth: '4',
      strokeColor: '#009900',
      gapPoint: 'top_left',
      trace: true,
  },
};




