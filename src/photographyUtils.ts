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
  return Promise.all(
    rawImages.map(async (rawImage, index) => {
      const baseImage = await getBaseImage(rawImage)
      return {
        ...baseImage,
        lazy: index >= 10,
      }
    }),
  )
}

async function getBaseImage(rawImage: RawImage): Promise<BaseImage> {
  const alt = getAltFromFilename(rawImage.src)
  const {
    src,
    attributes: { width, height },
  } = await getImage({ src: rawImage, format: 'webp', quality: 'high' })
  return {
    src,
    alt,
    aspectRatio: width / height,
  }
}

export interface MapImage extends BaseImage, EXIFData {
  location: [number, number]
  thumbnail: string
}

export async function getMapImages(globResult: GlobResult): Promise<MapImage[]> {
  const rawImages = await getRawImages(globResult)
  return Promise.all(
    rawImages.map(async (rawImage) => {
      const metadata = await extractMetadata(`.${rawImage.buildTimePath}`)
      if (!metadata) {
        throw new Error(`Missing metadata for image ${rawImage.src}`)
      }
      const baseImage = await getBaseImage(rawImage)
      const thumbnail = await getImage({
        src: rawImage,
        format: 'webp',
        quality: 'mid',
        width: 64,
        height: 64,
      })
      return {
        ...baseImage,
        ...metadata,
        thumbnail: thumbnail.src,
      }
    }),
  )
}

interface RawImage extends ImageMetadata {
  date: string
  buildTimePath: string
}

async function getRawImages(globResult: GlobResult): Promise<RawImage[]> {
  return Promise.all(
    Object.entries(globResult).map(async ([name, importAsset]) => {
      const module = await importAsset()
      if (typeof module !== 'object' || module === null || !('default' in module)) {
        throw new Error(`Invalid photo: ${name}`)
      }
      const fileNameIndex = name.lastIndexOf('/') + 1
      const date = name.substring(fileNameIndex, fileNameIndex + 10)
      return { ...(module.default as ImageMetadata), buildTimePath: name, date }
    }),
  )
}

function getAltFromFilename(filename: string): string {
  const startMarker = '__'
  const start = filename.lastIndexOf(startMarker) + startMarker.length
  const end = filename.indexOf('.', start)
  return filename.substring(start, end).replace(/-/g, ' ')
}

export interface EXIFData {
  location: [number, number]
  focalLength: string
  aperture: number
  shutterSpeed: string
}

async function extractMetadata(image: string): Promise<EXIFData | null> {
  const { gps, exif = {} } = await ExifReader.load(image, { expanded: true })
  if (!gps || !gps.Latitude || !gps.Longitude) {
    return null
  }
  const { FocalLengthIn35mmFilm, FocalLength, ApertureValue, ShutterSpeedValue } = exif
  const focalLength = FocalLengthIn35mmFilm ?? FocalLength
  if (!focalLength || !ApertureValue || !ShutterSpeedValue) {
    return null
  }

  return {
    location: [gps.Latitude, gps.Longitude],
    focalLength: focalLength.description,
    aperture: normalizeAperture(ApertureValue.description),
    shutterSpeed: normalizeShutterSpeed(ShutterSpeedValue.description),
  }
}

const exactApertures = [
  1.8, 2, 2.2, 2.5, 2.8, 3.2, 3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22,
]

function normalizeAperture(rawAperture: string) {
  const parsedAperture = parseFloat(rawAperture)
  let minDistance = Number.MAX_SAFE_INTEGER
  let minDistanceIndex = 0
  exactApertures.forEach((a, index) => {
    const distance = Math.abs(a - parsedAperture)
    if (distance >= minDistance) {
      return
    }
    minDistance = distance
    minDistanceIndex = index
  })
  return exactApertures[minDistanceIndex]
}

const validShutterSpeed = [
  '30',
  '25',
  '20',
  '15',
  '13',
  '10',
  '8.0',
  '6.0',
  '5.0',
  '4.0',
  '3.2',
  '2.5',
  '2.0',
  '1.6',
  '1.3',
  '1.0',
  '0.8',
  '0.6',
  '0.5',
  '0.4',
  '0.3',
  '1/4',
  '1/5',
  '1/6',
  '1/8',
  '1/10',
  '1/13',
  '1/15',
  '1/20',
  '1/25',
  '1/30',
  '1/40',
  '1/50',
  '1/60',
  '1/80',
  '1/100',
  '1/125',
  '1/160',
  '1/200',
  '1/250',
  '1/320',
  '1/400',
  '1/500',
  '1/640',
  '1/800',
  '1/1000',
  '1/1250',
  '1/1600',
  '1/2000',
  '1/2500',
  '1/3200',
  '1/4000',
  '1/5000',
  '1/6400',
  '1/8000',
]

function normalizeShutterSpeed(rawShutterSpeed: string) {
  const parsedShutterSpeed = parseFraction(rawShutterSpeed)
  let minDistance = Number.MAX_SAFE_INTEGER
  let minDistanceIndex = 0
  validShutterSpeed.forEach((ss, index) => {
    const distance = Math.abs(parseFraction(ss) - parsedShutterSpeed)
    if (distance >= minDistance) {
      return
    }
    minDistance = distance
    minDistanceIndex = index
  })
  return validShutterSpeed[minDistanceIndex]
}

function parseFraction(floatString: string) {
  if (floatString.includes('/')) {
    const [numerator, denominator] = floatString.split('/').map(parseFloat)
    return numerator / denominator
  }
  return parseFloat(floatString)
}

export function calculateCenter(locations: [number, number][]): [number, number] | undefined {
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
