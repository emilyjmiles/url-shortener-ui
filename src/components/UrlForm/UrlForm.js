import React, { Component } from 'react';

class UrlForm extends Component {
  constructor (props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newInput = {
      long_url: this.state.urlToShorten,
      title: this.state.title
    };
    this.props.addUrl(newInput);
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ title: '', urlToShorten: '' });
  };

  render() {
    return (
      <form data-cy='form'>
        <label data-cy='title-label'>URL Title:</label>
        <input
          data-cy='title-input'
          type='text'
          placeholder='Title...'
          name='title'
          value={ this.state.title }
          onChange={ e => this.handleChange(e) }
        />

        <label data-cy='url-label'>URL You'd Like to Shorten:</label>
        <input
          data-cy='url-input'
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={ this.state.urlToShorten }
          onChange={ e => this.handleChange(e) }
        />

        <button data-cy='submit-button' onClick={ e => this.handleSubmit(e) }>
          Shorten Please!
        </button>
      </form>
    );
  }
}

export default UrlForm;
