import { icon } from 'leaflet'
import type { MapOptions } from 'leaflet'
import type { FC } from 'react'
import { Suspense, lazy, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'
import { debounce } from '@yeger/debounce'

import { LazyMarker, LazyMarkerCluster } from '~/components/blog/examples/LeafletMap.lazy'
import type { MapImage } from '~/photographyUtils'

import 'leaflet/dist/leaflet.css'
import '~/styles/photography-map.css'

const HEADER_HEIGHT = 90 + 2 * 16

const LazyPopup = lazy(async () => ({ default: (await import('react-leaflet')).Popup }))

const PhotoMarker: FC<{ image: MapImage }> = ({ image }) => {
  const map = useMap()
  const popupRef = useRef<L.Popup>(null)

  useEffect(() => {
    const initialWidth = getImageWidth(image, map.getContainer())
    if (popupRef.current) {
      popupRef.current.options.minWidth = initialWidth
      popupRef.current.options.maxWidth = initialWidth
    }
    const updateWidth = debounce(() => {
      if (!popupRef.current) {
        return
      }

      const width = getImageWidth(image, map.getContainer())
      popupRef.current.options.minWidth = width
      popupRef.current.options.maxWidth = width

      if (!popupRef.current.isOpen()) {
        return
      }
      popupRef.current.update()

      const popupPane = popupRef.current.getElement()
      if (!popupPane) {
        return
      }

      const latLng = popupRef.current.getLatLng()
      if (!latLng) {
        return
      }

      map.panInside(latLng, {
        padding: popupRef.current.options.autoPanPadding,
      })
    })
    map.on('resize', updateWidth)
    return () => {
      map.off('resize', updateWidth)
    }
  }, [map, image])

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
      <LazyPopup ref={popupRef} className="[&_*:is(.leaflet-popup-content-wrapper,.leaflet-popup-tip)]:bg-base!" closeButton={false} autoPanPadding={[8, HEADER_HEIGHT]}>
        <div
          className="w-full"
          style={{ aspectRatio: String(image.aspectRatio) }}
        >
          <img
            src={image.src}
            alt={image.alt}
            draggable={false}
            decoding="async"
          />
        </div>
        <div className="text-strong mx-auto mt-1 flex max-w-sm justify-evenly gap-1 text-xs font-semibold *:flex *:grow *:justify-center">
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

export const PhotographyMap: FC<
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
