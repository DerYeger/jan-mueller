// @ts-expect-error Missing typedef
import BaseMarkerCluster from '@changey/react-leaflet-markercluster'
import type { MapOptions } from 'leaflet'
import { Marker, divIcon, icon, point } from 'leaflet'
import type { ComponentChildren, FunctionalComponent } from 'preact'
// @ts-expect-error Should be imported
// eslint-disable-next-line unused-imports/no-unused-imports
import { h } from 'preact'
import { MapContainer, TileLayer } from 'react-leaflet'

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

const createClusterCustomIcon = (cluster: any) => {
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

const LeafletMap: FunctionalComponent<
  {
    center: [number, number]
    children: ComponentChildren
    zoom: number
  } & MapOptions
> = ({ children, ...options }) => {
  return (
    <MapContainer
      className="h-[200px] sm:h-[300px] md:h-[400px] transition-all w-full card"
      scrollWheelZoom={false}
      {...options}
      maxZoom={20}
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
