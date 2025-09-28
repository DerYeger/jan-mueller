import { icon } from 'leaflet'
import type { MapOptions } from 'leaflet'
import type { FunctionalComponent } from 'preact'
import { Suspense, lazy, useState } from 'preact/compat'
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'

import { LazyMarker, LazyMarkerCluster } from '~/components/blog/examples/LeafletMap.lazy'
import type { MapImage } from '~/photographyUtils'

import 'leaflet/dist/leaflet.css'
import '~/styles/photography-map.css'

const HEADER_HEIGHT = 90 + 2 * 16

const LazyPopup = lazy(async () => (await import('react-leaflet')).Popup)

const PhotoMarker: FunctionalComponent<{ image: MapImage }> = ({ image }) => {
  const map = useMap()

  const [width, _setWidth] = useState(() => getImageWidth(image, map.getContainer()))

  // Changes to width are unfortunately not picked up by react-leaflet when a popup is re-opened
  // useEffect(() => {
  //   const onResize = () => {
  //     setWidth(getImageWidth(image, map.getContainer()))
  //   }
  //   map.addEventListener('resize', onResize)
  //   return () => {
  //     map.removeEventListener('resize', onResize)
  //   }
  // }, [map, image])

  return (
    <LazyMarker
      position={image.location}
      interactive
      icon={icon({
        iconUrl: image.thumbnail,
        iconRetinaUrl: image.thumbnail,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })}
    >
      <LazyPopup minWidth={width} maxWidth={width} closeButton={false} autoPanPadding={[8, HEADER_HEIGHT]}>
        <div
          class="w-full"
          style={{ aspectRatio: String(image.aspectRatio) }}
        >
          <img
            src={image.src}
            alt={image.alt}
            draggable={false}
            decoding="async"
          />
        </div>
        <div className="mx-auto mt-1 flex max-w-sm justify-evenly gap-1 text-xs font-semibold *:flex *:grow *:justify-center">
          <div>
            {image.focalLength}
          </div>
          <div>
            {`ƒ${image.aperture}`}
          </div>
          <div>
            {`${image.shutterSpeed} s`}
          </div>
        </div>
      </LazyPopup>
    </LazyMarker>
  )
}

const PADDING_FACTOR = 0.8
const MAX_SIZE = 1024

function getImageWidth(image: MapImage, mapContainer: HTMLElement) {
  const mapSize = mapContainer.getBoundingClientRect()
  const maxWidth = mapSize.width * PADDING_FACTOR
  const maxHeight = (mapSize.height - HEADER_HEIGHT) * PADDING_FACTOR
  const maxWidthByHeight = maxHeight * image.aspectRatio
  return Math.min(maxWidth, maxWidthByHeight, MAX_SIZE)
}

export const PhotographyMap: FunctionalComponent<
  { images: MapImage[], bounds?: [[number, number], [number, number]] } & Omit<MapOptions, 'zoom'>
> = ({ images, bounds, ...props }) => {
  return (
    <Suspense fallback={<></>}>
      <MapContainer
        className="photography-map relative isolate size-full transition-all"
        scrollWheelZoom
        bounds={bounds}
        boundsOptions={{ padding: [5, 5] }}
        maxZoom={18}
        zoomControl={false}
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomleft" />
        <Suspense fallback={<></>}>
          <LazyMarkerCluster>
            {images.map((image) => (
              <PhotoMarker key={image.src} image={image} />
            ))}
          </LazyMarkerCluster>
        </Suspense>
      </MapContainer>
    </Suspense>
  )
}
