import React from 'react'

const BuyMeACoffeeWidget = () => {

    const path = "https://cdn.buymeacoffee.com/buttons/v2/default-violet.png";

  return (
    <a
      href="https://www.buymeacoffee.com/jonatanschultz"
      target="_blank"
    >
      <img
        src={path}
        alt="Buy Me A Coffee"
      />
    </a>
  );
}

export default BuyMeACoffeeWidget