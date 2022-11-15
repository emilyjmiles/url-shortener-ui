import React, { Component } from 'react';

import { getUrls, postUrl } from '../../apiCalls';

import './App.css';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      urls: [],
      error: null
    };
  }

  renderUrls = () => {
    getUrls()
      .then(data => this.setState({ urls: data.urls }))
      .catch(error => this.setState({ error: error }));
  };

  componentDidMount() {
    this.renderUrls();
  }

  addUrl = newUrl => {
    postUrl(newUrl)
      .then(data => this.setState({ urls: [...this.state.urls, data] }))
      .catch(error => this.setState({ error: error }));
  };

  render() {
    return (
      <main className="App">
        <header data-cy='header'>
          <h1 data-cy='app-title'>URL Shortener</h1>
          <UrlForm addUrl={ this.addUrl } />
        </header>
        <UrlContainer urls={ this.state.urls } />
      </main>
    );
  }
}

export default App;
