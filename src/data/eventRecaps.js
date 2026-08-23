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
  {
    slug: 'apc-back-to-school-2026',
    title: 'APC Back to School 2026',
    logo: '/apc-logo.png',
    hideSectionTag: true,
    sliderDuration: 45,
    date: 'August 2026',
    location: 'Brampton, Ontario',
    intro:
      'Back to school outreach with All People\'s Church, connecting with families and distributing care kits to children heading back to the classroom.',
    summary: [
      'At the APC Back to School 2026 event, our team partnered with All People\'s Church to reach families preparing for the new school year.',
      'We distributed care kits, shared information about our programs, and connected with parents and children throughout the day.',
      'The event was a great opportunity to expand our reach in the Brampton community and build new relationships with local families.',
    ],
    hero: {
      src: '/event-recap/apc-back-to-school/8Y0A9562.jpg',
      alt: 'APC Back to School 2026 event',
      width: 6000,
      height: 4000,
      variants: [{ src: '/event-recap/apc-back-to-school/8Y0A9562.jpg', width: 6000 }],
    },
    photos: [
      {
        src: '/event-recap/apc-back-to-school/8Y0A9551.jpg',
        alt: 'Volunteers at APC Back to School 2026',
        width: 5858,
        height: 3905,
        variants: [{ src: '/event-recap/apc-back-to-school/8Y0A9551.jpg', width: 5858 }],
      },
      {
        src: '/event-recap/apc-back-to-school/8Y0A9562.jpg',
        alt: 'APC Back to School 2026 event setup',
        width: 6000,
        height: 4000,
        variants: [{ src: '/event-recap/apc-back-to-school/8Y0A9562.jpg', width: 6000 }],
      },
      {
        src: '/event-recap/apc-back-to-school/8Y0A9564.jpg',
        alt: 'Families at APC Back to School 2026',
        width: 6000,
        height: 4000,
        variants: [{ src: '/event-recap/apc-back-to-school/8Y0A9564.jpg', width: 6000 }],
      },
      {
        src: '/event-recap/apc-back-to-school/0H9A9158-web.mp4',
        alt: 'APC Back to School 2026 highlight video',
        type: 'video',
        poster: '/event-recap/apc-back-to-school/0H9A9158-poster.jpg',
      },
      {
        src: '/event-recap/apc-back-to-school/0H9A9159-web.mp4',
        alt: 'APC Back to School 2026 event footage',
        type: 'video',
        poster: '/event-recap/apc-back-to-school/0H9A9159-poster.jpg',
      },
      {
        src: '/event-recap/apc-back-to-school/8Y0A9552-web.mp4',
        alt: 'APC Back to School 2026 community moment',
        type: 'video',
        poster: '/event-recap/apc-back-to-school/8Y0A9552-poster.jpg',
      },
    ],
  },
]

export function getLatestEventRecaps() {
  return eventRecaps
}
