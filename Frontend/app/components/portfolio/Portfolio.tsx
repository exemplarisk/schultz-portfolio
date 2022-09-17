import React from 'react'

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>Most Recent Work</h5>
      <h2>2022</h2>

      <div className="container portfolio__container">
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <iframe
              width="100%"
              height="400px"
              src="https://casa-larios.vercel.app"
              title="casalarios"
            ></iframe>
          </div>
          <h3>Casa Los Larios</h3>
          <div className="portfolio__item-cta">
            <a
              href="https://github.com/exemplarisk/casa-larios"
              target="_blank"
              rel="noopener"
              className="btn"
            >
              GITHUB
            </a>
            <a
              href="https://casa-larios.vercel.app"
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              CASA LARIOS
            </a>
            <div>
              <a>React, NextJs, TypeScript, MaterialUI, TailwindCSS</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Portfolio