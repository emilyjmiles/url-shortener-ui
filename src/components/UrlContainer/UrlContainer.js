import React from 'react';
import './UrlContainer.css';

const UrlContainer = ({ urls }) => {
  const urlEls = urls.map(url => {
    console.log(url);
    return (
      <div className="url" key={ url.id }>
        <h3>{ url.title }</h3>
        <p>New shortened URL: <a href={ url.short_url } target="blank">{ url.short_url }</a></p>
        <p>Previous URL: <a href={ url.long_url } target="blank">{ url.long_url }</a></p>
      </div>
    );
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  );
};

export default UrlContainer;
