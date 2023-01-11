import type { MapOptions } from 'leaflet'
import type { FunctionalComponent } from 'preact'
import { Suspense, lazy } from 'preact/compat'

const LazyLeafletMap = lazy(
  () => import('~/components/blog/examples/LeafletMap')
)
const LazyMarker = lazy(async () => (await import('react-leaflet')).Marker)
const LazyMarkerCluster = lazy(
  async () =>
    (await import('~/components/blog/examples/LeafletMap')).MarkerCluster
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

export const LeafletMap: FunctionalComponent<
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

export const LeafletMapWithMarkers: FunctionalComponent<
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

export const LeafletMapWithClusters: FunctionalComponent<
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
