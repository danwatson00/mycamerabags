import React from 'react';

export const Select = props =>
  <select className="ui-select" onChange={(e) => props.onChange(e)}>
    {props.options.map(x => {
      return (
        <option value={props.optionValueRenderer(x)}>{props.optionNameRenderer(x)}</option>
      )
    })}
  </select>;