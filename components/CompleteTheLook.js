'use client'

import React from 'react'
import data from '../data/fashion-items.json'
import Image from 'next/image'

export default function CompleteTheLook({ selected, onSelect }) {
  if (!selected || !selected.pair_with || selected.pair_with.length === 0) {
    return <p className="text-gray-600">No suggestions available for this item.</p>
  }

  const suggestions = selected.pair_with
    .map(id => data.find(i => i.objectID === String(id)))
    .filter(Boolean)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {suggestions.map(item => (
        <div
          key={item.objectID}
          className="bg-gray-50 p-2 rounded cursor-pointer hover:shadow"
          onClick={() => onSelect(item.objectID)}
        >
          <div className="relative w-full h-28 mb-2">
            <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="text-sm">
            <div className="font-medium truncate">{item.name}</div>
            <div className="text-gray-500">${item.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
