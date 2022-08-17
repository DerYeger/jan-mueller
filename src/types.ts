export interface Award {
  name: string
  date: string
  href?: string
}

export interface Education {
  name: string
  institution: string
  startDate: string
  endDate?: string
}

export interface Experience {
  name: string
  description: string
  startDate: string
  endDate?: string
  href?: string
}

export interface Project {
  id: string
  title: string
  details: string
}
