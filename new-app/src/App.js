import React, { Component } from 'react';
import {
  MDCDialog,
} from '@material/dialog';
import {
  MDCCheckbox,
} from '@material/checkbox';

import './App.css';

import Clock from 'components/Clock';

import Checkbox from 'components/MDC-Checkbox';

import {
  getClassName,
} from 'helpers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour12Mode: false,
      showDate: false,
      showDayOfWeek: false,
      showingSettingsModal: false,
    };

    this.boundShowSettingsModal = this.showSettingsModal.bind(this);
    this.boundHideSettingsModal = this.hideSettingsModal.bind(this);
  }

  componentDidMount() {
    if (this._settingsDialog) {
      this._settingsDialog.listen('MDCDialog:accept', (event) => {
        console.log('accepted', event);
        event.preventDefault();
      });
      this._settingsDialog.listen('MDCDialog:cancel', (event) => {
        console.log('canceled', event);
        event.preventDefault();
      });
    }
  }
  componentWillUnmount() {
  }

  showSettingsModal() {
    this._settingsDialog.show();
    // this.setState({
    //   showingSettingsModal: true,
    // });
  }
  hideSettingsModal() {
    // this.setState({
    //   showingSettingsModal: false,
    // });
  }

  render() {
    return (
      <div className="App --flex-col">
        <header className="App-header mdc-toolbar">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start" />
            <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
              <a
                role="button"
                onClick={this.boundShowSettingsModal}
                className="material-icons mdc-toolbar__icon"
                aria-label="Settings"
                alt="Settings"
              >settings</a>
            </section>
          </div>
        </header>

        <div className="App-clockWrapper --flex__fill">
          <Clock
            hour12Mode={this.state.hour12Mode}
            showDate={this.state.showDate}
            showDayOfWeek={this.state.showDayOfWeek}
          />
        </div>

        <p className="App-signature">
          This project is inspired by <a href="http://enjoy.your-clock.com/?hl=en-US" target="_blank" rel="noopener noreferrer">Google Chrome App <i>Digital Clock</i></a>. Redesigned and rebuilt by &copy; <a href="mailto:hello@xc-h.com">Xingchen Hong</a> 2012.
        </p>

        <aside
          className="mdc-dialog"
          role="alertdialog"
          aria-hidden="true"
          ref={(ref) => this._settingsDialog = new MDCDialog(ref)}
        >
          <div className="mdc-dialog__surface">
            <header className="mdc-dialog__header">
              <h2 className="mdc-dialog__header__title">
                Settings
              </h2>
            </header>
            <section className="mdc-dialog__body">

              <div className="--flex-col">

                <Checkbox
                  checked={this.state.hour12Mode}
                  label="Show 12 Hours with AM/PM"
                />

                <div className="mdc-form-field">
                  <div
                    className="mdc-checkbox"
                    ref={(ref) => this._hour12ModeCheckbox = new MDCCheckbox(ref)}
                  >
                    <input
                      type="checkbox"
                      id="use-hour12Mode"
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
                  <label htmlFor="use-hour12Mode">Show 12 Hours with AM/PM</label>
                </div>

                <div className="mdc-form-field">
                  <div
                    className="mdc-checkbox"
                    ref={(ref) => this._showDateCheckbox = new MDCCheckbox(ref)}
                  >
                    <input
                      type="checkbox"
                      id="use-showDate"
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
                  <label htmlFor="use-showDate">Show Date</label>
                </div>

                <div className="mdc-form-field">
                  <div
                    className={getClassName([
                      'mdc-checkbox',
                      {
                        'mdc-checkbox--disabled': this.state.showDate,
                      },
                    ])}
                    ref={(ref) => this._showDayOfWeekCheckbox = new MDCCheckbox(ref)}
                  >
                    <input
                      type="checkbox"
                      id="use-showDayOfWeek"
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
                  <label htmlFor="use-showDayOfWeek">Show Day Of Week</label>
                </div>

              </div>

            </section>
            <footer className="mdc-dialog__footer">
              <i>Changes are immediately saved.</i>
            </footer>
          </div>
          <div className="mdc-dialog__backdrop"></div>
        </aside>

      </div>
    );
  }
}

export default App;
