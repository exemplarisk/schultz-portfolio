import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { quotes } from "./data/quotes";

const QuoteCarousel: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length),
    onSwipedRight: () =>
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
      ),
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="quote-carousel">
      <blockquote>
        <p>"{quotes[currentQuoteIndex].text}"</p>
        <div className="quotesfooter">— {quotes[currentQuoteIndex].author}</div>
      </blockquote>
      <div className="quote-indicators">
        {quotes.map((_, idx) => (
          <span
            key={idx}
            className={`indicator ${idx === currentQuoteIndex ? "active" : ""}`}
            onClick={() => setCurrentQuoteIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;