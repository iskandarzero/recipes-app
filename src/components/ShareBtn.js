import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copied, setCopied] = useState('');

  function handleShareBtn() {
    setCopied('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <button data-testid="share-btn" type="button" onClick={ handleShareBtn }>
      <img src={ shareIcon } alt="share icon" />
      {copied}
    </button>
  );
}

export default ShareButton;
