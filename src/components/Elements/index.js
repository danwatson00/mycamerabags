import React from 'react';

export const Select = props =>
  <select className="ui-select" onChange={(e) => props.onChange(e)}>
    <option key={1000} value="" selected>{props.placeholder}</option>
    {props.options.map((x, index) => {
      return (
        <option key={index} value={props.optionValueRenderer(x)}>{props.optionNameRenderer(x)}</option>
      )
    })}
  </select>;