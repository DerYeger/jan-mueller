export interface Award {
  id: string
  name: string
  date: string
  by: string
  href?: string
}

export interface Education {
  id: string
  name: string
  institution: string
  startDate: string
  endDate: string
  grade: string
  href: string
}

export interface ExperienceRole {
  title: string
  description?: string
  startDate: string
  endDate?: string
}

export interface Experience {
  id: string
  name: string
  roles: ExperienceRole[]
  location: string
  href?: string
}

export interface Project {
  id: string
  title: string
  details: string
  url: string
}
