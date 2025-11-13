export interface BrandfetchCompanyData {
  id?: string
  name?: string
  domain?: string
  claimed?: boolean
  description?: string
  longDescription?: string
  links?: {
    name: string
    url: string
  }[]
  logos?: {
    theme: string
    formats: {
      src: string
      background: string | null
      format: string
      height: number | null
      width: number | null
      size: number
    }[]
    tags: string[]
    type: string
  }[]
  colors?: {
    hex: string
    type: string
    brightness: number
  }[]
  fonts?: {
    name: string
    type: string
    origin: string
    originId: string | null
    weights: number[]
  }[]
  images?: {
    formats: {
      src: string
      background: string | null
      format: string
      height: number
      width: number
      size: number
    }[]
    tags: string[]
    type: string
  }[]
  qualityScore?: number
  company?: {
    employees?: number
    financialIdentifiers?: {
      isin: string[]
      ticker: string[]
    }
    foundedYear?: number
    industries?: {
      score: number
      id: string
      name: string
      emoji: string
      parent: {
        emoji: string
        id: string
        name: string
        slug: string
      } | null
      slug: string
    }[]
    kind?: string
    location?: {
      city?: string
      country?: string
      countryCode?: string
      region?: string
      state?: string
      subregion?: string
    }
  }
  isNsfw?: boolean
  urn?: string
}