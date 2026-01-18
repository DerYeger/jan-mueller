import type { CollegeOrUniversity, Person, WebSite, WithContext } from 'schema-dts'

const universityOfKassel: CollegeOrUniversity = {
  '@type': 'CollegeOrUniversity',
  name: ['University of Kassel'],
}

const tuWien: CollegeOrUniversity = {
  '@type': 'CollegeOrUniversity',
  name: ['TU Wien'],
}

const url = 'https://janmueller.dev'

const author: Person = {
  '@type': 'Person',
  name: 'Jan Müller',
  additionalName: 'Patrick',
  alumniOf: [universityOfKassel, tuWien],
  email: ['janmueller3698@gmail.com', 'mail@janmueller.dev'],
  gender: 'Male',
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Senacor Technologies AG',
  },
  knowsAbout: [
    'Computer Science',
    'Software Engineering',
    'Full-stack Engineering',
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
