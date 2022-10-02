import React from 'react'

const BuyMeACoffeeWidget = () => {

    const path = "https://cdn.buymeacoffee.com/buttons/v2/default-violet.png";

  return (
    <div className="coffee__container">
      <a className="coffee__button" href="https://www.buymeacoffee.com/jonatanschultz" target="_blank">
        <img className="coffee__image" src={path} alt="Buy Me A Coffee" />
      </a>
    </div>
  );
}

export default BuyMeACoffeeWidget