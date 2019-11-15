import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: ""
        };
        this.autocompleteSearchThrottled = debounce(300, this.autocompleteSearch);
    }

    changeQuery = (e) => {
        this.setState({ q: e.target.value }, () => {
            this.autocompleteSearchThrottled(this.state.q);
        });
    }

    autocompleteSearch = () => {
        this._fetch(this.state.q);        
    }

    _fetch = (q) => {
        const _searches = this.state._searches || [];
        _searches.push(q);
        this.setState({ _searches });
    }

    render() {
        const _searches = this.state._searches || [];
        return (
          <div>
            <h2>Debounce</h2>
            <p>300 millisecond Debouncing triggering the autocomplete on every input.</p>
            <input
              placeholder="Type something here"
              type="text"
              value={this.state.q}
              onChange={this.changeQuery}
            />
            <hr />
            {_searches.length ? (
              <button
                type="button"
                onClick={event => this.setState({ _searches: [] })}
              >
                Reset
              </button>
            ) : null}
            <ol>
              {_searches.map((s, i) => {
                return <li key={s + i}>{s}</li>;
              })}
            </ol>
          </div>
        );
      }
}