import React from 'react';
import './elements.css';

export const Select = props =>
  <select className="ui-select" onChange={(e) => props.onChange(e)}>
    <option key={1000} value="">{props.placeholder}</option>
    {props.options.map((x, index) => {
      return (
        <option key={index} value={props.optionValueRenderer(x)}>
          {props.optionNameRenderer(x)}
        </option>
      )
    })}
  </select>;

  export const SelectButtonGroup = props =>
  <div className="select-button-group">
    <select className="ui-select" onChange={(e) => props.onChange(e)}>
      <option key={1000} value="">{props.placeholder}</option>
      {props.options.map((x, index) => {
        return (
          <option key={index}value={props.optionValueRenderer(x)}>
            {props.optionNameRenderer(x)}
          </option>
        )
      })}
    </select>
    <button disabled={props.disabled} type="button" name={props.name} onClick={() => props.click()}>
      {props.label}
    </button>
  </div>;