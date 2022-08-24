import type { MapOptions } from 'leaflet'
import type { FunctionalComponent } from 'preact'
import { Suspense, lazy } from 'preact/compat'

const LazyLeafletMap = lazy(() => import('./LeafletMap'))
export const MarkerCluster = lazy(
  async () => (await import('./LeafletMap')).MarkerCluster
)
export const Marker = lazy(async () => (await import('react-leaflet')).Marker)

const center: [number, number] = [48.2082, 16.3738]

const markers: [number, number][] = [center, [48.2, 16.37], [48.1987, 16.3685]]

export const LeafletMap: FunctionalComponent<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <Suspense fallback={<></>}>
          {markers.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  )
}

export const ClusteredLeafletMap: FunctionalComponent<
  Omit<MapOptions, 'center' | 'zoom'>
> = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <LazyLeafletMap center={center} zoom={13} {...props}>
        <Suspense fallback={<></>}>
          <MarkerCluster>
            {markers.map((position, index) => (
              <Marker key={index} position={position} />
            ))}
          </MarkerCluster>
        </Suspense>
      </LazyLeafletMap>
    </Suspense>
  )
}
