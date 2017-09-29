import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Clock.css';

import { getClassName } from 'helpers';

import DateView from 'components/DateView';
import TimeView from 'components/TimeView';

class Clock extends Component {
  static propTypes = {
    className: PropTypes.string,
    hour12Mode: PropTypes.bool,
    showDate: PropTypes.bool,
    showDayOfWeek: PropTypes.bool,
    updateInterval: PropTypes.number,
  };
  static defaultProps = {
    className: '',
    hour12Mode: false,
    showDate: false,
    showDayOfWeek: false,
    updateInterval: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      //@type {Date}
      dateTime: new Date(),
      //@type {number}
      updateTimerId: 0,
    };

    this.boundUpdateDateTime = this.updateDateTime.bind(this);
  }

  componentDidMount() {
    this.startUpdate();
  }
  componentWillUnmount() {
    this.stopUpdate();
  }

  startUpdate() {
    const {
      updateTimerId,
    } = this.state;

    if (updateTimerId !== 0) {
      return;
    }

    const newUpdateTimerId = setInterval(this.boundUpdateDateTime, this.props.updateInterval);

    this.setState({
      updateTimerId: newUpdateTimerId,
    });
  }
  stopUpdate() {
    const {
      updateTimerId,
    } = this.state;

    if (updateTimerId === 0) {
      return;
    }

    clearInterval(updateTimerId);

    this.setState({
      updateTimerId: 0,
    });
  }
  updateDateTime() {
    const {
      dateTime,
    } = this.state;
    const newDateTime = new Date();

    if (dateTime.valueOf() === newDateTime.valueOf()) {
      return;
    }

    this.setState({
      dateTime: newDateTime,
    });
  }

  render() {
    return (
      <div className={getClassName([
        'Clock',
        this.props.className,
      ])}>
        <TimeView
          dateTime={this.state.dateTime}
          hour12Mode={this.props.hour12Mode}
        />
        {
          this.props.showDate
          ? <DateView
            dateTime={this.state.dateTime}
            showDayOfWeek={this.props.showDayOfWeek}
          />
          : null
        }
      </div>
    );
  }
}

export default Clock;
