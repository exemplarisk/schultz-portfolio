import React from 'react'

const CTA = () => {
  return (
    <div className="cta">
      <a href="cv.pdf" download className="btn">
        Download CV
      </a>
      <a href="#contact" className='btn btn-primary'>Contact me</a>
    </div>
  );
}

export default CTA