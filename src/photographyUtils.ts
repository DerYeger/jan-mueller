import { getImage } from 'astro:assets'
import ExifReader from 'exifreader'

export type GlobResult = Record<string, () => Promise<unknown>>

export interface BaseImage {
  src: string
  alt: string
  aspectRatio: number
}

export interface GalleryImage extends BaseImage {
  lazy: boolean
}

export async function getGalleryImages(globResult: GlobResult): Promise<GalleryImage[]> {
  const rawImages = (await getRawImages(globResult)).sort((a, b) => b.date.localeCompare(a.date)) // newest first
  return Promise.all(rawImages.map(async (rawImage, index) => {
    const baseImage = await getBaseImage(rawImage)
    return {
      ...baseImage,
      lazy: index >= 10,
    }
  }))
}

async function getBaseImage(rawImage: RawImage): Promise<BaseImage> {
  const alt = getAltFromFilename(rawImage.src)
  const {
    src,
    attributes: { width, height },
  } = await getImage({ src: rawImage, format: 'webp', quality: 'max' })
  return {
    src,
    alt,
    aspectRatio: width / height,
  }
}

export interface MapImage extends BaseImage {
  location: [number, number]
  thumbnail: string
}

export async function getMapImages(globResult: GlobResult): Promise<MapImage[]> {
  const rawImages = await getRawImages(globResult)
  const processedImages: (MapImage | null)[] = await Promise.all(rawImages.map(async (rawImage) => {
    const coordinates = await extractCoordinates(`.${rawImage.buildTimePath}`)
    if (!coordinates || !coordinates.Latitude || !coordinates.Longitude) {
      return null
    }
    const baseImage = await getBaseImage(rawImage)
    const thumbnail = await getImage({ src: rawImage, format: 'webp', quality: 'mid', width: 64, height: 64 })
    return {
      ...baseImage,
      location: [coordinates.Latitude, coordinates.Longitude],
      thumbnail: thumbnail.src,
    }
  }))
  return processedImages.filter((image): image is MapImage => image !== null)
}

interface RawImage extends ImageMetadata {
  date: string
  buildTimePath: string
}

async function getRawImages(globResult: GlobResult): Promise<RawImage[]> {
  return Promise.all(Object.entries(globResult).map(async ([name, importAsset]) => {
    const module = await importAsset()
    if (typeof module !== 'object' || module === null || !('default' in module)) {
      throw new Error(`Invalid photo: ${name}`)
    }
    const fileNameIndex = name.lastIndexOf('/') + 1
    const date = name.substring(fileNameIndex, fileNameIndex + 10)
    return { ...module.default as ImageMetadata, buildTimePath: name, date }
  }))
}

function getAltFromFilename(filename: string): string {
  const startMarker = '__'
  const start = filename.lastIndexOf(startMarker) + startMarker.length
  const end = filename.indexOf('.', start)
  return filename.substring(start, end).replace(/-/g, ' ')
}

async function extractCoordinates(image: string) {
  const metadata = await ExifReader.load(image, { expanded: true })
  return metadata.gps
}

export function calculateCenter(
  locations: [number, number][],
): [number, number] | undefined {
  if (locations.length === 0) {
    return undefined
  }
  const [totalX, totalY] = locations.reduce<[number, number]>(
    ([accX, accY], [locX, locY]) => {
      return [accX + locX, accY + locY]
    },
    [0, 0],
  )
  return [totalX / locations.length, totalY / locations.length]
}

export function calculateBounds(
  locations: [number, number][],
): [[number, number], [number, number]] | undefined {
  if (locations.length === 0) {
    return undefined
  }

  let minLat = locations[0][0]
  let maxLat = locations[0][0]
  let minLng = locations[0][1]
  let maxLng = locations[0][1]

  for (const [lat, lng] of locations) {
    if (lat < minLat) {
      minLat = lat
    }
    if (lat > maxLat) {
      maxLat = lat
    }
    if (lng < minLng) {
      minLng = lng
    }
    if (lng > maxLng) {
      maxLng = lng
    }
  }

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ]
}
