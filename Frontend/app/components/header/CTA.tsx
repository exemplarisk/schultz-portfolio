import React from "react";

const DENIALS = [
  "Nice try. That file is in witness protection.",
  "Access denied. My CV joined a monastery.",
  "404: Career path redacted for everyone's safety.",
  "Nope. Recruiters unlock this via Contact me.",
  "Classified. Even I need two-factor to open it.",
];

const CTA = () => {
  const [denial, setDenial] = React.useState<string | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  const handleClassifiedClick = () => {
    const next = DENIALS[Math.floor(Math.random() * DENIALS.length)];
    setDenial(next);
  };

  React.useEffect(() => {
    if (!denial) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const wrap = wrapRef.current;
      if (wrap && event.target instanceof Node && !wrap.contains(event.target)) {
        setDenial(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDenial(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [denial]);

  return (
    <div className="cta">
      <div className="cta__cvWrap" ref={wrapRef}>
        <button
          type="button"
          className={`btn btn--classified${denial ? " is-denied" : ""}`}
          onClick={handleClassifiedClick}
          aria-label="CV is classified and not publicly available"
          aria-describedby={denial ? "cv-denied-msg" : undefined}
          aria-expanded={Boolean(denial)}
        >
          <span className="btn--classified__text" aria-hidden="true">
            View my CV
          </span>
          <span className="btn--classified__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="btn--classified__stamp" aria-hidden="true">
            CLASSIFIED
          </span>
        </button>
        {denial && (
          <p id="cv-denied-msg" className="cta__denied" role="status">
            {denial}{" "}
            <a href="#contact">Contact me</a> instead.
          </p>
        )}
      </div>
      <a
        href="#contact"
        className="btn btn-primary"
        aria-label="Go to Contact section"
      >
        Contact me
      </a>
    </div>
  );
};

export default CTA;
