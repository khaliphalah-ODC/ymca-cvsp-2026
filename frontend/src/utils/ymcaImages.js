import logo from '../assets/ymca/logo/0a4854a1-3bf2-4c5f-998c-19ac76ff201d.jpeg'
import heroOne from '../assets/ymca/herosection/771ac2c3-0a3c-459e-83e0-54566122b5b1.jpeg'
import heroTwo from '../assets/ymca/herosection/905f9952-d6e1-4f24-b5eb-7548e7e1b289.jpeg'
import heroThree from '../assets/ymca/herosection/c8b6ef55-dbfa-4e52-830c-617222569c3d.jpeg'
import heroFour from '../assets/ymca/herosection/c9153c7e-5e8f-4505-8e38-7e94744f3ecc.jpeg'
import heroFive from '../assets/ymca/herosection/c9478210-aebb-4149-a8e3-815458480414.jpeg'
import galleryOne from '../assets/ymca/gallery/06bd85aa-fb23-4fcd-94c1-b20edc80dc4b.jpeg'
import galleryTwo from '../assets/ymca/gallery/2b8a009f-1e57-4d8c-a145-4537a7ebcbff.jpeg'
import galleryThree from '../assets/ymca/gallery/c9153c7e-5e8f-4505-8e38-7e94744f3ecc.jpeg'
import ymcaOne from '../assets/ymca/779fe9d9-c497-4821-837e-5f069dd2262b.jpeg'
import ymcaTwo from '../assets/ymca/80d4e97b-df8c-4c2a-9cfa-e35f1caa9258.jpeg'
import ymcaThree from '../assets/ymca/ad1cae86-771d-44ef-ad6c-29c051ffbca3.jpeg'

export const ymcaImages = {
  logo,
  hero: [heroOne, heroTwo, heroThree, heroFour, heroFive],
  gallery: [galleryOne, galleryTwo, galleryThree, ymcaOne, ymcaTwo, ymcaThree],
  activities: {
    Basketball: heroTwo,
    'Digital Literacy': ymcaTwo,
    Music: galleryOne,
    Chess: heroFive,
    'Creative Arts': galleryTwo,
    Catering: ymcaThree,
    Tailoring: heroThree,
    Cosmetology: galleryThree,
    'Peace Building': heroFour,
    Entrepreneurship: ymcaOne,
    'Civic Education': heroOne,
  },
}
