import React from 'react'

const CTA = () => {
  return (
    <div className="cta">
      <a 
        target="_blank" 
        rel="noopener noreferrer" 
        href="cv.pdf" 
        className="btn" 
        aria-label="View my CV in PDF format"
      >
        View my CV
      </a>
      <a 
        href="#contact" 
        className="btn btn-primary"
        aria-label="Go to Contact section"
      >
        Contact me
      </a>
    </div>
  );
}

export default CTA;