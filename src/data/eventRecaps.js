export const eventRecaps = [
  {
    slug: 'td-mosaic-festival',
    title: 'TD Mosaic Festival',
    date: 'July 2026',
    location: 'Mississauga, Ontario',
    intro:
      'A busy summer festival stop where our team met families, shared program information, and introduced The First Chapter to new community members.',
    summary: [
      'At TD Mosaic Festival in Mississauga, our volunteers spoke with families across the grounds, shared printed information about our programs, and introduced The First Chapter to attendees who were meeting us for the first time.',
      'We spent the day answering questions, connecting with parents, and sharing details about our care kit and community outreach work.',
      'The event gave us a clear look at the scale of the festival and the number of people who stopped to learn more about our work.',
    ],
    hero: {
      src: '/event-recap/td-mosaic-festival/hero1-960.png',
      alt: 'Crowd gathered at TD Mosaic Festival beside The First Chapter information table',
      width: 1600,
      height: 1067,
      variants: [
        { src: '/event-recap/td-mosaic-festival/hero1-960.png', width: 960 },
        { src: '/event-recap/td-mosaic-festival/hero1-1600.png', width: 1600 },
      ],
    },
    photos: [
      {
        src: '/event-recap/td-mosaic-festival/hero2-960.png',
        alt: 'Audience members gathered around the The First Chapter table at TD Mosaic Festival',
        width: 1600,
        height: 1066,
        variants: [
          { src: '/event-recap/td-mosaic-festival/hero2-960.png', width: 960 },
          { src: '/event-recap/td-mosaic-festival/hero2-1600.png', width: 1600 },
        ],
      },
      {
        src: '/event-recap/td-mosaic-festival/hero3-960.png',
        alt: 'Volunteer speaking with children at the TD Mosaic Festival information table',
        width: 1600,
        height: 1066,
        variants: [
          { src: '/event-recap/td-mosaic-festival/hero3-960.png', width: 960 },
          { src: '/event-recap/td-mosaic-festival/hero3-1600.png', width: 1600 },
        ],
      },
    ],
  },
]

export function getLatestEventRecap() {
  return eventRecaps[0]
}