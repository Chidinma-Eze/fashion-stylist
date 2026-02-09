'use client'

import React from 'react'
import Image from 'next/image'
import CompleteTheLook from './CompleteTheLook'

export default function SelectedItemCard({ item, onSelect }) {
  if (!item) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600">No item selected. Click an item to see details.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48 h-48 relative rounded overflow-hidden">
          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.category} • {item.color}</p>
          <p className="text-lg font-bold mt-4">${item.price}</p>

          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => onSelect(null)}
            >
              Deselect
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">Complete the look</h4>
        <CompleteTheLook selected={item} onSelect={onSelect} />
      </div>
    </div>
  )
}
