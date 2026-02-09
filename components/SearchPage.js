'use client'

import React, { useState } from 'react'
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch-hooks-web'
import { algoliaClient } from '../lib/algolia'
import HitCard from './HitCard'
import SelectedItemCard from './SelectedItemCard'
import data from '../data/fashion_items.json'

const searchClient = algoliaClient

export default function SearchPage() {
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [filters, setFilters] = useState({})

  // Find selected item from data
  const selectedItem = selectedItemId
    ? data.find(item => String(item.objectID) === String(selectedItemId))
    : null

  const handleSelectItem = (objectID) => {
    setSelectedItemId(objectID)
  }

  const handleClearSelection = () => {
    setSelectedItemId(null)
  }

  return (
    <InstantSearch searchClient={searchClient} indexName="fashion_items">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Category</h3>
              <RefinementList attribute="category" />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <RefinementList attribute="color" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Search bar */}
          <div className="mb-6">
            <SearchBox
              placeholder="Search fashion items..."
              className="w-full"
              classNames={{
                root: 'w-full',
                form: 'relative w-full',
                input:
                  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                submit: 'absolute right-3 top-2.5 text-gray-400',
              }}
            />
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Results - Left/Top */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-semibold mb-4">Results</h2>
                <Hits
                  hitComponent={({ hit }) => (
                    <div onClick={() => handleSelectItem(hit.objectID)}>
                      <HitCard hit={hit} onSelect={handleSelectItem} />
                    </div>
                  )}
                  classNames={{
                    root: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4',
                    list: 'contents',
                  }}
                />
              </div>
            </div>

            {/* Selected Item Details - Right/Bottom */}
            <div className="lg:col-span-1">
              <SelectedItemCard item={selectedItem} onSelect={handleSelectItem} />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}
