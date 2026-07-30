export type PlaceId = "sweden" | "guatemala" | "spain" | "china";

export type PlaceImage = {
  src: string;
  alt: string;
};

export type PlaceStory = {
  id: PlaceId;
  name: string;
  city: string;
  lat: number;
  lon: number;
  region: string;
  headline: string;
  blurb: string;
  highlights: string[];
  images: PlaceImage[];
};

/** Homes from Jonatan's story: interactive globe chapters */
export const PLACE_STORIES: PlaceStory[] = [
  {
    id: "sweden",
    name: "Sweden",
    city: "Ulricehamn",
    lat: 57.7916,
    lon: 13.4142,
    region: "Born here",
    headline: "Home base",
    blurb:
      "I was born in Ulricehamn. Sweden is where I grew up, learned to build things, and still come back to. Cold winters, good coffee, and the place that feels like default settings.",
    highlights: ["Born here", "Grew up", "Still home"],
    images: [
      {
        src: "/places/sweden-1.webp",
        alt: "Ulricehamn by the water in Sweden",
      },
      {
        src: "/places/sweden-2.jpg",
        alt: "Town view of Ulricehamn, Sweden",
      },
    ],
  },
  {
    id: "guatemala",
    name: "Guatemala",
    city: "Antigua",
    lat: 14.5586,
    lon: -90.7335,
    region: "Family",
    headline: "Family lives here",
    blurb:
      "I've got family in Antigua, Guatemala, so this place isn't just a pin on a map. It's people. Visits mean food, stories, and a side of life that keeps me grounded outside of code.",
    highlights: ["Family", "Visits", "Real life"],
    images: [
      {
        src: "/places/guatemala-1.jpg",
        alt: "Santa Catalina Arch in Antigua, Guatemala",
      },
      {
        src: "/places/guatemala-2.jpg",
        alt: "Colonial streets in Antigua, Guatemala",
      },
    ],
  },
  {
    id: "spain",
    name: "Spain",
    city: "Torrevieja",
    lat: 37.9787,
    lon: -0.6822,
    region: "Family house",
    headline: "The family house",
    blurb:
      "My family has a house in Torrevieja, so I've spent a lot of time there. It's less a travel destination and more somewhere you leave a toothbrush. Easy days, late dinners, and a second kind of home.",
    highlights: ["Family house", "Long stays", "Second home"],
    images: [
      {
        src: "/places/spain-1.jpg",
        alt: "Torrevieja waterfront on the Costa Blanca, Spain",
      },
      {
        src: "/places/spain-2.jpg",
        alt: "Pink salt lagoon near Torrevieja, Spain",
      },
    ],
  },
  {
    id: "china",
    name: "China",
    city: "Shanghai",
    lat: 31.2304,
    lon: 121.4737,
    region: "Studied here",
    headline: "Went to study",
    blurb:
      "I studied in Shanghai, which is a very different classroom than a laptop at home. New language, new pace, and a stretch of life that permanently widened how I see the world.",
    highlights: ["Studied", "Lived there", "Big shift"],
    images: [
      {
        src: "/places/china-1.jpg",
        alt: "Shanghai skyline at night from the Bund",
      },
      {
        src: "/places/china-2.jpg",
        alt: "Pudong skyline across the river in Shanghai",
      },
    ],
  },
];

export const PLACE_CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
];

export const getPlaceById = (id: PlaceId) =>
  PLACE_STORIES.find((place) => place.id === id) ?? null;

export const getAdjacentPlaceId = (id: PlaceId, direction: -1 | 1): PlaceId => {
  const index = PLACE_STORIES.findIndex((place) => place.id === id);
  const next = (index + direction + PLACE_STORIES.length) % PLACE_STORIES.length;
  return PLACE_STORIES[next].id;
};
