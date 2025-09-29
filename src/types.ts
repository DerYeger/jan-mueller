export interface Award {
  name: string
  date: string
  by: string
  href?: string
}

export interface Education {
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
  name: string
  roles: ExperienceRole[]
  href?: string
}

export interface Project {
  id: string
  title: string
  details: string
  url: string
}
