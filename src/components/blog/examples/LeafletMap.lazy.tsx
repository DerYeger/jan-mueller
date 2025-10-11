/* eslint-disable react/no-array-index-key */
import type { MapOptions } from 'leaflet'
import type { FC } from 'react'
import { Suspense, lazy } from 'react'

export const LazyLeafletMap = lazy(
  () => import('~/components/blog/examples/LeafletMap'),
)
export const LazyMarker = lazy(async () => ({ default: (await import('react-leaflet')).Marker }))
const LazyMapCenter = lazy(
  async () => ({ default: (await import('~/components/blog/examples/LeafletMap')).MapCenter }),
)
export const LazyMarkerCluster = lazy(
  async () =>
  ({ default: (await import('~/components/blog/examples/LeafletMap')).MarkerCluster }),
)

const center: [number, number] = [48.2082, 16.3738]

const markers: [number, number][] = [
  center,
  [48.2, 16.37],
  [48.1987, 16.3685],
  [48.21691214, 16.37184958],
  [48.2118711625, 16.377811362499997],
  [48.201041271428565, 16.36940797142857],
  [48.202613, 16.36890834],
]

export const LeafletMap: FC<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div className="h-[200px]" />}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <></>
      </LazyLeafletMap>
    </Suspense>
  )
}

export const LeafletMapWithMarkers: FC<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div className="h-[200px]" />}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <Suspense fallback={<></>}>
          {markers.map((position, index) => (
            <LazyMarker key={index} position={position} interactive={false} />
          ))}
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  )
}

export const LeafletMapWithClusters: FC<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div className="h-[200px]" />}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <Suspense fallback={<></>}>
          <LazyMarkerCluster>
            {markers.map((position, index) => (
              <LazyMarker key={index} position={position} interactive={false} />
            ))}
          </LazyMarkerCluster>
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  )
}

export const LeafletMapWithCenterText: FC<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div className="h-[200px]" />}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <Suspense fallback={<></>}>
          <LazyMapCenter />
          <LazyMarkerCluster>
            {markers.map((position, index) => (
              <LazyMarker key={index} position={position} interactive={false} />
            ))}
          </LazyMarkerCluster>
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  )
}
