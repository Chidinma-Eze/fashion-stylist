'use client'

import Image from 'next/image'
import React from 'react'

export default function HitCard({ hit, onSelect }) {
  if (!hit?.image) return null;
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition p-3"
      onClick={() => onSelect(hit.objectID)}
    >
      <div className="w-full h-40 relative mb-3">
        <image src={hit.image || "/denimshirt.jpeg"} alt={hit.title || "image"} width={400} height={300} className="object-cover" ></image>
      </div>

      <div>
        <h4 className="font-medium text-sm truncate">{hit.name}</h4>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-gray-600 text-sm">{hit.color}</span>
          <span className="font-semibold">${hit.price}</span>
        </div>
      </div>
    </div>
  )
}
