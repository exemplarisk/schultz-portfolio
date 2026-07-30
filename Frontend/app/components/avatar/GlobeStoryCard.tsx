import React from "react";
import {
  getAdjacentPlaceId,
  getPlaceById,
  PLACE_STORIES,
  type PlaceId,
} from "./data/placeStories";

type GlobeStoryCardProps = {
  placeId: PlaceId;
  onClose: () => void;
  onSelect: (id: PlaceId) => void;
};

const GlobeStoryCard = ({ placeId, onClose, onSelect }: GlobeStoryCardProps) => {
  const place = getPlaceById(placeId);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const [activePhoto, setActivePhoto] = React.useState(0);

  React.useEffect(() => {
    setActivePhoto(0);
    closeRef.current?.focus();
  }, [placeId]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onSelect(getAdjacentPlaceId(placeId, -1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onSelect(getAdjacentPlaceId(placeId, 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onSelect, placeId]);

  if (!place) {
    return null;
  }

  const index = PLACE_STORIES.findIndex((entry) => entry.id === place.id);
  const photos = place.images;
  const current = photos[Math.min(activePhoto, photos.length - 1)];

  return (
    <aside
      className="globeStory"
      role="dialog"
      aria-modal="false"
      aria-labelledby={`globe-story-title-${place.id}`}
      aria-describedby={`globe-story-body-${place.id}`}
    >
      <div className="globeStory__top">
        <p className="globeStory__region">{place.region}</p>
        <button
          ref={closeRef}
          type="button"
          className="globeStory__close"
          onClick={onClose}
          aria-label="Close place story"
        >
          ×
        </button>
      </div>

      <p className="globeStory__place">
        <span className="globeStory__city">{place.city}</span>
        <span className="globeStory__country">{place.name}</span>
      </p>

      {current && (
        <div className="globeStory__photos">
          <div className="globeStory__photoStage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`${place.id}-${current.src}`}
              className="globeStory__photo"
              src={current.src}
              alt={current.alt}
              loading="eager"
            />
          </div>
          {photos.length > 1 && (
            <div className="globeStory__thumbs" role="tablist" aria-label={`${place.city} photos`}>
              {photos.map((photo, photoIndex) => {
                const selected = photoIndex === activePhoto;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`globeStory__thumb${selected ? " is-active" : ""}`}
                    onClick={() => setActivePhoto(photoIndex)}
                    aria-label={`Show photo ${photoIndex + 1} of ${photos.length}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <h3 id={`globe-story-title-${place.id}`} className="globeStory__title">
        {place.headline}
      </h3>
      <p id={`globe-story-body-${place.id}`} className="globeStory__blurb">
        {place.blurb}
      </p>

      <ul className="globeStory__highlights">
        {place.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="globeStory__nav">
        <button
          type="button"
          className="globeStory__navBtn"
          onClick={() => onSelect(getAdjacentPlaceId(place.id, -1))}
          aria-label="Previous place"
        >
          ← Prev
        </button>
        <span className="globeStory__progress" aria-hidden="true">
          {index + 1} / {PLACE_STORIES.length}
        </span>
        <button
          type="button"
          className="globeStory__navBtn"
          onClick={() => onSelect(getAdjacentPlaceId(place.id, 1))}
          aria-label="Next place"
        >
          Next →
        </button>
      </div>

      <a className="globeStory__more" href="#story">
        More of the story ↓
      </a>
    </aside>
  );
};

export default GlobeStoryCard;
