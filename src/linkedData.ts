import type {
  CollegeOrUniversity,
  Person,
  WebSite,
  WithContext,
} from 'schema-dts'

const universityOfKassel: CollegeOrUniversity = {
  '@type': 'CollegeOrUniversity',
  name: ['University of Kassel'],
}

const url = 'https://jan-mueller.at'

const author: Person = {
  '@type': 'Person',
  name: 'Jan Müller',
  additionalName: 'Patrick',
  alumniOf: [universityOfKassel],
  birthDate: '1998-06-03',
  email: ['janmueller3698@gmail.com', 'mail@jan-mueller.at'],
  gender: 'Male',
  image: `${url}/avatar.webp`,
  jobTitle: 'Software Engineer',
  knowsAbout: [
    'Computer Science',
    'Mobile Engineering',
    'Software Engineering',
    'Web Engineering',
  ],
  knowsLanguage: ['English', 'German'],
  nationality: {
    '@type': 'Country',
    name: 'Germany',
  },
  sameAs: ['https://github.com/DerYeger'],
  url,
}

const website: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  author,
  url,
}

export const LinkedData = website
