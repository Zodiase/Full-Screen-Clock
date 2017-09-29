import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import {
  MDCCheckbox,
} from '@material/checkbox';
import '@material/checkbox/dist/mdc.checkbox.css';

import {
  getClassName,
} from 'helpers';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    label: PropTypes.string,
  };
  static defaultProps = {
    className: '',
    disabled: false,
    disabled: false,
    label: null,
  };

  constructor(props) {
    super(props);

    this._secretCheckboxId = uuidv4();
  }

  componentDidMount() {
    if (this._mdcCheckbox) {
      this._mdcCheckbox.listen('MDCCheckbox:change', (event) => {
        console.log('change', event);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this._mdcCheckbox.checked = nextProps.checked;
    this._mdcCheckbox.disabled = nextProps.disabled;

    return false;
  }

  render() {
    return (
      <div
        className={getClassName([
          'mdc-form-field',
        ])}
      >
        <div
          className="mdc-checkbox"
          ref={(ref) => this._mdcCheckbox = new MDCCheckbox(ref)}
        >
          <input
            type="checkbox"
            id={this._secretCheckboxId}
            className="mdc-checkbox__native-control"
          />
          <div className="mdc-checkbox__background">
            <svg
              className="mdc-checkbox__checkmark"
              viewBox="0 0 24 24"
            >
              <path
                className="mdc-checkbox__checkmark__path"
                fill="none"
                stroke="white"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
              />
            </svg>
            <div className="mdc-checkbox__mixedmark"></div>
          </div>
        </div>

        {
          this.props.label === null
          ? null
          : (
            <label htmlFor={this._secretCheckboxId}>{this.props.label}</label>
          )
        }

      </div>
    );
  }
}

export default Checkbox;
