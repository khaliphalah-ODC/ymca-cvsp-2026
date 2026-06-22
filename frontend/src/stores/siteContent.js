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
        image: ymcaImages.activities.Basketball,
        tagClass: 'bg-tertiary text-on-tertiary',
      },
      {
        title: 'Digital Literacy',
        tag: 'Technology',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Practical computer confidence, internet safety, typing, and productivity tools.',
        image: ymcaImages.activities['Digital Literacy'],
        tagClass: 'bg-primary-container text-on-primary-container',
      },
      {
        title: 'Music',
        tag: 'Expression',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Rhythm, voice, performance, and collaborative creativity.',
        image: ymcaImages.activities.Music,
        tagClass: 'bg-tertiary-container text-on-tertiary-container',
      },
      {
        title: 'Chess',
        tag: 'Strategy',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Focus, planning, patience, and problem solving through chess.',
        image: ymcaImages.activities.Chess,
        tagClass: 'bg-primary-container text-on-primary-container',
      },
      {
        title: 'Creative Arts',
        tag: 'Arts',
        duration: '2 Months',
        ages: 'CVSP Participants',
        description: 'Drawing, craft, color, design, and creative confidence.',
        image: ymcaImages.activities['Creative Arts'],
        tagClass: 'bg-surface-container-highest text-on-surface',
      },
    ],
    galleryItems: [
      ['sports', 'Sports', 'Basketball and Movement', 'masonry-tall', ymcaImages.gallery[0]],
      ['learning', 'Learning', 'Digital Literacy Moment', '', ymcaImages.gallery[1]],
      ['arts', 'Arts', 'Creative Expression', 'masonry-wide', ymcaImages.gallery[2]],
      ['skills', 'Skills', 'Hands-on Development', 'masonry-tall', ymcaImages.gallery[3]],
      ['community', 'Community', 'CVSP Fellowship', '', ymcaImages.gallery[4]],
      ['leadership', 'Leadership', 'Learning Together', '', ymcaImages.gallery[5]],
    ],
  }),
})
