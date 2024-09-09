import React from 'react'

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>Most Recent Work</h5>
      <h2>latest creations</h2>

      <div className="container portfolio__container">
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <iframe
              src="https://casaloslarios.com/sv/"
              title="casalarios"
            ></iframe>
          </div>
          <h3>Casa Los Larios</h3>
          <div className="portfolio__item-cta">
            <a
              href="https://github.com/exemplarisk/casa-los-larios-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              GITHUB
            </a>
            <a
              href="https://casaloslarios.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              CASA LARIOS
            </a>
            <div>
              <p>React, NextJs, TypeScript, MaterialUI, TailwindCSS</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Portfolio