import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  {
    text: "Don't be afraid to start over.. This time, you restart with experience.",
    author: "Unknown",
  },
  {
    text: "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.",
    author: "Stephen Hawking",
  },
  {
    text: "Questions you cannot answer are usually far better for you than answers you cannot question.",
    author: "Yuval Noah Harari",
  },
  {
    text: "Our prime purpose in this life is to help others. And if you can't help them, at least don't hurt them.",
    author: "Dalai Lama",
  },
  {
    text: "Do your little bit of good where you are: it's those little bits of good put together that overwhelm the world.",
    author: "Desmond Tutu",
  },
  {
    text: "Intelligence is the ability to adapt to change.",
    author: "Stephen Hawking",
  },
  {
    text: "In our quest for happiness and the avoidance of suffering, we are all fundamentally the same, and therefore equal.",
    author: "Dalai Lama",
  },
  {
    text: "I am not the sum of my successes and failures. I am the sum of my experiences, and the impact I've had on others.",
    author: "AI",
  },
];

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
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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