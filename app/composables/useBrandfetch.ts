import type { BrandfetchCompanyData } from '~/types/brandFetch'
export const useBrandfetch = () => {
  const config = useRuntimeConfig()
  
  const API_KEY = config.public.brandfetchApiKey || ''
  const brandfetchApiUrl = config.public.brandfetchApiUrl || ''
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const extractDomain = (input: string): string | null => {
    if (!input) return null
    
    // Remove whitespace
    input = input.trim()
    
    // If it's an email, extract domain from email
    if (input.includes('@')) {
      const parts = input.split('@')
      return parts[1] || null
    }
    
    // If it's a URL, extract domain
    try {
      // Add protocol if missing
      let url = input
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      // If URL parsing fails, assume it's already a domain
      return input.replace('www.', '')
    }
  }

  const fetchCompanyData = async (urlOrDomain: string): Promise<BrandfetchCompanyData | null> => {
    isLoading.value = true
    error.value = null

    try {
      const domain = extractDomain(urlOrDomain)
      
      if (!domain) {
        throw new Error('Invalid URL or domain')
      }

      // Brandfetch API endpoint
      const response = await fetch(`${brandfetchApiUrl}/${domain}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Company not found. Please enter details manually.')
        }
        throw new Error(`Failed to fetch company data: ${response.statusText}`)
      }

      const data: BrandfetchCompanyData = await response.json()
      return data
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch company data'
      error.value = errorMessage
      console.error('Brandfetch API error:', e)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const downloadImageAsFile = async (imageUrl: string, filename: string = 'logo.png'): Promise<File | null> => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      return new File([blob], filename, { type: blob.type })
    } catch (e) {
      console.error('Failed to download image:', e)
      return null
    }
  }

  const getBestLogo = (data: BrandfetchCompanyData): string | null => {
    if (!data.logos?.length) return null

    const allowedFormats = ['png', 'jpeg', 'jpg']
    const preferredOrder = [
      { type: 'logo', theme: 'dark' },
      { type: 'logo', theme: 'light' },
      { type: 'logo', theme: null },
      { type: 'icon', theme: null }
    ]

    // Try each logo type/theme combination in order
    for (const { type, theme } of preferredOrder) {
      const entry = data.logos.find(l => l.type === type && (theme === null || l.theme === theme))
      if (!entry?.formats) continue

      // Try each format in order
      for (const format of allowedFormats) {
        const found = entry.formats.find(f => f.format.toLowerCase() === format)
        if (found) return found.src
      }
    }

    return null
  }

  return {
    isLoading,
    error,
    fetchCompanyData,
    downloadImageAsFile,
    extractDomain,
    getBestLogo
  }
}

