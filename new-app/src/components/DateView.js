import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DateView.css';

import {
  getClassName,
} from 'helpers';

class DateView extends Component {
  static propTypes = {
    className: PropTypes.string,
    showDayOfWeek: PropTypes.bool,
    dateTime: PropTypes.instanceOf(Date),
  };
  static defaultProps = {
    className: '',
    showDayOfWeek: true,
    dateTime: null,
  };

  render() {
    const {
      dateTime,
    } = this.props;

    const time = {
      dayOfMonth: dateTime ? dateTime.getDate() : 0,
      dayOfWeek: dateTime ? dateTime.getDay(): 0,
      month: dateTime ? dateTime.getMonth(): 0,
      year: dateTime ? dateTime.getFullYear() : 0,
    };

    const timeStrings = {
      dayOfMonth: String(time.dayOfMonth) + ((time.dayOfMonth > 0 && time.dayOfMonth < 4 || time.dayOfMonth > 20 && time.dayOfMonth < 24 || time.dayOfMonth > 30) ? ['st', 'nd', 'rd'][time.dayOfMonth % 10 - 1] : 'th'),
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][time.dayOfWeek],
      month: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'][time.month],
      year: String(time.year),
    };

    return (
      <div
        className={getClassName([
          'DateView',
          {
            'DateView--showDayOfWeek': this.props.showDayOfWeek,
          },
          this.props.className,
        ])}
      >
        <i className="DateView__dayOfWeek">{timeStrings.dayOfWeek}</i>
        <i className="DateView__month">{timeStrings.month}</i>
        <i className="DateView__dayOfMonth">{timeStrings.dayOfMonth}</i>
        <i className="DateView__yearSeperator">,</i>
        <i className="DateView__year">{timeStrings.year}</i>
      </div>
    );
  }
}

export default DateView;
