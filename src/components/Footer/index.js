import React from 'react';
import { useHistory } from 'react-router-dom';
import { Compass, Martini, CookingPot } from 'phosphor-react';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.scss';

function Footer() {
  const history = useHistory();

  return (
    <footer id="footer" data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <Martini size={ 40 } />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        src={ exploreIcon }
      >
        <Compass size={ 40 } />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
      >
        <CookingPot size={ 40 } />
      </button>
    </footer>
  );
}

export default Footer;
