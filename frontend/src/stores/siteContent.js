import { defineStore } from 'pinia'
import { ymcaImages } from '../utils/ymcaImages'

export const useSiteContentStore = defineStore('siteContent', {
  state: () => ({
    navItems: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Activities', to: '/activities' },
      { label: 'Skills', to: '/skills' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Track', to: '/track' },
      { label: 'Contact', to: '/contact' },
    ],
    programs: [
      {
        title: 'Basketball',
        tag: 'Sports',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Team play, fitness, discipline, and confidence through structured basketball sessions.',
        image: ymcaImages.showcase.basketball,
        tagClass: 'bg-tertiary text-on-tertiary',
      },
      {
        title: 'Digital Literacy',
        tag: 'Technology',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Practical computer confidence, internet safety, typing, and productivity tools.',
        image: ymcaImages.showcase.digital,
        tagClass: 'bg-primary-container text-on-primary-container',
      },
      {
        title: 'Music',
        tag: 'Expression',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Rhythm, voice, performance, and collaborative creativity.',
        image: ymcaImages.showcase.music,
        tagClass: 'bg-tertiary-container text-on-tertiary-container',
      },
    ],
    hardSkills: [
      {
        title: 'Catering',
        description: 'Food preparation, hygiene, presentation, and practical kitchen confidence.',
        image: ymcaImages.showcase.catering,
      },
      {
        title: 'Tailoring',
        description: 'Introductory stitching, measurement, fabric care, and creative repair.',
        image: ymcaImages.showcase.tailoring,
      },
      {
        title: 'Cosmetology',
        description: 'Personal care, grooming, beauty basics, and confident presentation.',
        image: ymcaImages.showcase.cosmetology,
      },
    ],
    softSkills: [
      {
        title: 'Peace Building',
        description: 'Respectful dialogue, tolerance, conflict prevention, and community harmony.',
        image: ymcaImages.showcase.peace,
      },
      {
        title: 'Entrepreneurship',
        description: 'Idea development, simple budgeting, initiative, and business confidence.',
        image: ymcaImages.showcase.entrepreneurship,
      },
      {
        title: 'Civic Education',
        description: 'Rights, responsibilities, leadership, service, and active citizenship.',
        image: ymcaImages.showcase.civic,
      },
    ],
    whyJoin: [
      'Learn new skills',
      'Build confidence and leadership',
      'Make new friends',
      'Improve basketball and digital skills',
      'Explore career and entrepreneurship opportunities',
      'Have fun in a safe and supportive environment',
    ],
    registration: {
      phone: '0771907585',
      email: 'cvsp@montserradoymca.org',
      website: 'www.montserradoymca.org',
      venue: 'YMCA, Crown Hill, Broad Street, Monrovia',
      duration: '2 Months beginning July 2026',
      message: 'Register now through Montserrado County YMCA program channels.',
    },
    partners: [
      {
        name: 'APM Terminals',
        role: 'Program partner supporting stronger kids, stronger families, and stronger communities.',
        image: ymcaImages.partners.apmTerminal,
      },
      {
        name: 'Cemenco',
        role: 'Community partner supporting youth development and the CVSP 2026 experience.',
        image: ymcaImages.partners.cemenco,
      },
    ],
    galleryItems: [
      ['sports', 'Sports', 'Basketball and Movement', 'masonry-tall', ymcaImages.showcase.basketball],
      ['learning', 'Learning', 'Digital Literacy Moment', '', ymcaImages.showcase.digital],
      ['arts', 'Arts', 'Creative Expression', 'masonry-wide', ymcaImages.showcase.music],
      ['skills', 'Skills', 'Catering Practice', 'masonry-tall', ymcaImages.showcase.catering],
      ['skills', 'Skills', 'Tailoring and Craft', '', ymcaImages.showcase.tailoring],
      ['skills', 'Skills', 'Cosmetology Confidence', '', ymcaImages.showcase.cosmetology],
      ['community', 'Community', 'Peace Building', 'masonry-wide', ymcaImages.showcase.peace],
      ['leadership', 'Leadership', 'Entrepreneurship Training', '', ymcaImages.showcase.entrepreneurship],
      ['leadership', 'Leadership', 'Civic Education', '', ymcaImages.showcase.civic],
      ['community', 'Community', 'CVSP Campaign Flyer', 'masonry-wide', ymcaImages.showcase.flyer],
      ['sports', 'Sports', 'Match Recognition', 'masonry-tall', ymcaImages.showcase.match],
      ['community', 'Community', 'CVSP Fellowship', '', ymcaImages.gallery[4]],
    ],
  }),
})
