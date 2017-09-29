import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TimeView.css';

import {
  getClassName,
  pad2Digit,
} from 'helpers';

class TimeView extends Component {
  static propTypes = {
    className: PropTypes.string,
    hour12Mode: PropTypes.bool,
    dateTime: PropTypes.instanceOf(Date),
  };
  static defaultProps = {
    className: '',
    hour12Mode: true,
    dateTime: null,
  };

  render() {
    const {
      dateTime,
    } = this.props;

    const time = {
      hour: dateTime ? dateTime.getHours() : 0,
      minute: dateTime ? dateTime.getMinutes(): 0,
      second: dateTime ? dateTime.getSeconds(): 0,
    };

    time.hour12 = time.hour % 12;

    const timeStrings = [
      'hour',
      'hour12',
      'minute',
      'second',
    ].reduce((acc, field) => ({
      ...acc,

      [field]: pad2Digit(time[field]),
    }), {});

    timeStrings.am = ['AM', 'PM'][Math.floor(time.hour / 12)];

    return (
      <div
        className={getClassName([
          'TimeView',
          {
            'TimeView--hour12': this.props.hour12Mode,
          },
          this.props.className,
        ])}
      >
        <span className="TimeView__hour12">
          <i className="TimeView__singleDigit">{timeStrings.hour12[0]}</i>
          <i className="TimeView__singleDigit">{timeStrings.hour12[1]}</i>
        </span>

        <span className="TimeView__hour24">
          <i className="TimeView__singleDigit">{timeStrings.hour[0]}</i>
          <i className="TimeView__singleDigit">{timeStrings.hour[1]}</i>
        </span>
        
        <i className="TimeView__singleDigit">:</i>

        <span className="TimeView__minute">
          <i className="TimeView__singleDigit">{timeStrings.minute[0]}</i>
          <i className="TimeView__singleDigit">{timeStrings.minute[1]}</i>
        </span>

        <i className="TimeView__singleDigit">:</i>

        <span className="TimeView__second">
          <i className="TimeView__singleDigit">{timeStrings.second[0]}</i>
          <i className="TimeView__singleDigit">{timeStrings.second[1]}</i>
        </span>

        <i className="TimeView__am TimeView__doubleDigit">{timeStrings.am}</i>
      </div>
    );
  }
}

export default TimeView;
