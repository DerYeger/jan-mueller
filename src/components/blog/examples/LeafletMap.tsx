import BaseMarkerCluster from 'react-leaflet-markercluster'
import type { MapOptions } from 'leaflet'
import { Marker, divIcon, icon, point } from 'leaflet'
import type { FC } from 'react'
import React, { useState } from 'react'
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
      'bg-[#e74c3c]/100 text-white font-bold flex! items-center justify-center rounded-3xl border-white/50 border-4',
    iconSize: point(40, 40, true),
  })
}

export const MarkerCluster: FC<{
  children: React.ReactNode | React.ReactNode[]
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

export const MapCenter: FC = () => {
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
      className="button absolute right-2 top-2 rounded-sm border-2 border-medium bg-base px-2 py-1 text-strong z-400"
      onClick={() => map.setZoom(13)}
    >
      {text}
    </span>
  )
}

const LeafletMap: FC<
  {
    center: [number, number]
    children: React.ReactNode | React.ReactNode[]
    zoom: number
  } & MapOptions
> = ({ children, ...options }) => {
  return (
    <MapContainer
      className="card relative isolate h-50 w-full sm:h-75 md:h-100"
      scrollWheelZoom={false}
      maxZoom={18}
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
