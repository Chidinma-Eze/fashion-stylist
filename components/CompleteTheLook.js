'use client'

import React from 'react'
import data from '../data/fashion_items.json'
import Image from 'next/image'

export default function CompleteTheLook({ selected, onSelect }) {
  if (!selected) {
    return <p className="text-gray-600">No suggestions available for this item.</p>
  }

  const neutralColors = ['white', 'black', 'gray', 'beige', 'khaki', 'brown', 'navy']

  const candidates = data.filter(d => String(d.objectID) !== String(selected.objectID))

  function scoreCandidate(candidate) {
    let score = 0

    // Strong boost if explicitly paired
    if (selected.pair_with && selected.pair_with.includes(Number(candidate.objectID))) score += 100

    // Category heuristics
    if (selected.category === 'tops' && candidate.category === 'bottoms') score += 30
    if (selected.category === 'bottoms' && candidate.category === 'tops') score += 30
    if (candidate.category === 'shoes') score += 20
    if (candidate.category === 'accessories') score += 25

    // Color matching
    if (candidate.color === selected.color) score += 20
    else if (neutralColors.includes(candidate.color)) score += 15

    // Price proximity (closer price is slightly better)
    const priceDiff = Math.abs((candidate.price || 0) - (selected.price || 0))
    const priceRatio = priceDiff / Math.max(1, selected.price || 1)
    if (priceRatio < 0.25) score += 10
    else if (priceRatio < 0.5) score += 5

    return score
  }

  const scored = candidates
    .map(c => ({ item: c, score: scoreCandidate(c) }))
    .sort((a, b) => b.score - a.score)

  const suggestions = scored.slice(0, 6).map(s => s.item)

  if (!suggestions || suggestions.length === 0) {
    return <p className="text-gray-600">No suggestions available for this item.</p>
  }

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
