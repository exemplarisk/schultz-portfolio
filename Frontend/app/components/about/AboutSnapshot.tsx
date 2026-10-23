import React from "react";

const CHAPTERS = [
  {
    label: "Born",
    place: "Ulricehamn",
    note: "Grew up here. Still feels like home.",
  },
  {
    label: "Family",
    place: "Antigua",
    note: "I've got family there, so the visits actually matter.",
  },
  {
    label: "House",
    place: "Torrevieja",
    note: "Family place. I spend a lot of time there when I can.",
  },
  {
    label: "Studied",
    place: "Shanghai",
    note: "Went for school. Came back seeing the world a bit differently.",
  },
];

const AboutSnapshot = () => {
  return (
    <article className="aboutSnapshot">
      <div className="aboutSnapshot__intro">
        <p className="aboutSnapshot__eyebrow">A few places</p>
        <h3 className="aboutSnapshot__name">Where I&apos;ve been</h3>
        <p className="aboutSnapshot__bio">
          The work is leadership and change. I&apos;ve also lived in a few corners of the
          world, and that still shapes how I do it.
        </p>
      </div>

      <ol className="aboutSnapshot__chapters">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.place} className="aboutSnapshot__chapter">
            <div className="aboutSnapshot__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="aboutSnapshot__copy">
              <p className="aboutSnapshot__label">{chapter.label}</p>
              <h4 className="aboutSnapshot__place">{chapter.place}</h4>
              <p className="aboutSnapshot__note">{chapter.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="aboutSnapshot__footnote">
        The globe up top is clickable if you want more.
      </p>
    </article>
  );
};

export default AboutSnapshot;
