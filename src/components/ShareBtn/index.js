import React, { useState } from 'react';
import { Export } from 'phosphor-react';
import shareIcon from '../../images/shareIcon.svg';
import './styles.scss';

function ShareButton() {
  const [copied, setCopied] = useState('');

  function handleShareBtn() {
    const time = 1500;
    setCopied('Link copied!');
    setTimeout(() => {
      setCopied('');
    }, time);
    navigator.clipboard.writeText(
      window.location.href.replace('/in-progress', ''),
    );
  }

  return (
    <button
      data-testid="share-btn"
      id="share-btn"
      type="button"
      src={ shareIcon }
      onClick={ handleShareBtn }
    >
      {copied}
      <Export size={ 40 } color="#7A7AC7" alt="share icon" />
    </button>
  );
}

export default ShareButton;
