import BaseMarkerCluster from '@changey/react-leaflet-markercluster'
import type { MapOptions } from 'leaflet'
import { Marker, divIcon, icon, point } from 'leaflet'
import type { ComponentChildren, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'

Marker.prototype.options.icon = icon({
  iconUrl: '/static/leaflet/map-marker.svg',
  iconRetinaUrl: '/static/leaflet/map-marker.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  shadowUrl: '/static/leaflet/marker-shadow.png',
  shadowRetinaUrl: '/static/leaflet/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
})

function createClusterCustomIcon(cluster: any) {
  return divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className:
      'bg-[#e74c3c] bg-opacity-100 text-white font-bold !flex items-center justify-center rounded-3xl border-white border-4 border-opacity-50',
    iconSize: point(40, 40, true),
  })
}

export const MarkerCluster: FunctionalComponent<{
  children: ComponentChildren
}> = ({ children }) => {
  return (
    <BaseMarkerCluster
      iconCreateFunction={createClusterCustomIcon}
      showCoverageOnHover={false}
    >
      {children}
    </BaseMarkerCluster>
  )
}

export const MapCenter: FunctionalComponent = () => {
  const map = useMap()
  const [location, setLocation] = useState(map.getCenter())
  const { lat, lng } = location
  const text = `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  useMapEvents({
    move(event) {
      setLocation(event.target.getCenter())
    },
    zoom(event) {
      setLocation(event.target.getCenter())
    },
  })
  return (
    <span
      class="button z-101 absolute right-2 top-2 rounded border-2 border-neutral-400 bg-white px-2 py-1 text-black"
      onClick={() => map.setZoom(13)}
    >
      {text}
    </span>
  )
}

const LeafletMap: FunctionalComponent<
  {
    center: [number, number]
    children: ComponentChildren
    zoom: number
  } & MapOptions
> = ({ children, ...options }) => {
  return (
    <MapContainer
      className="card relative isolate h-[200px] w-full transition-all sm:h-[300px] md:h-[400px]"
      scrollWheelZoom={false}
      maxZoo={18}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  )
}

export default LeafletMap
