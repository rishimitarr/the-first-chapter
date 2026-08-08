export const eventRecaps = [
  {
    slug: 'td-mosaic-festival',
    title: 'TD Mosaic Festival',
    date: 'August 2026',
    location: 'Mississauga, Ontario',
    intro:
      'A busy summer event where our team met families, shared program information, and introduced The First Chapter to new community members.',
    summary: [
      'At TD Mosaic Festival in Mississauga, our volunteers spoke with families across the grounds, shared printed information about our programs, and introduced The First Chapter to attendees who were meeting us for the first time.',
      'We spent the day answering questions, connecting with parents, and sharing details about our care kit and community outreach work.',
      'The event gave us a clear look at the scale of the festival and the number of people who stopped to learn more about our work.',
    ],
    hero: {
      src: '/event-recap/td-mosaic-festival/audience.jpg',
      alt: 'Audience gathered at TD Mosaic Festival',
      width: 1086,
      height: 1448,
      variants: [{ src: '/event-recap/td-mosaic-festival/audience.jpg', width: 1086 }],
    },
    photos: [
      {
        src: '/event-recap/td-mosaic-festival/table.jpg',
        alt: 'The First Chapter table at TD Mosaic Festival',
        width: 1199,
        height: 1600,
        variants: [{ src: '/event-recap/td-mosaic-festival/table.jpg', width: 1199 }],
      },
      {
        src: '/event-recap/td-mosaic-festival/talking.jpg',
        alt: 'Volunteers talking with families at The First Chapter table during TD Mosaic Festival',
        width: 1200,
        height: 1600,
        variants: [{ src: '/event-recap/td-mosaic-festival/talking.jpg', width: 1200 }],
      },
      {
        src: '/event-recap/td-mosaic-festival/wider-audience.jpg',
        alt: 'Wider view of the crowd gathered at TD Mosaic Festival',
        width: 962,
        height: 720,
        variants: [{ src: '/event-recap/td-mosaic-festival/wider-audience.jpg', width: 962 }],
      },
    ],
  },
]

export function getLatestEventRecap() {
  return eventRecaps[0]
}
