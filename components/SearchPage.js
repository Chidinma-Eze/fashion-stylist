'use client'

import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import {
  InstantSearch,
  SearchBox,
  RefinementList,
  SortBy,
  useHits
} from 'react-instantsearch-hooks-web'
import HitCard from './HitCard'
import SelectedItemCard from './SelectedItemCard'
import data from '../data/fashion-items.json'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
)

function HitsGrid({ onSelect }) {
  const { hits } = useHits()
  if (!hits || hits.length === 0) {
    return (
      <div className="py-12 text-center text-gray-600">
        <p className="text-xl">No results found.</p>
        <p className="mt-2">Try adjusting filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {hits.map(hit => (
        <HitCard key={hit.objectID} hit={hit} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default function SearchPage() {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'fashion_items'
  const [selectedId, setSelectedId] = useState(null)

  const selectedItem = data.find(i => i.objectID === String(selectedId)) || null

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="mb-4">
              <SearchBox placeholder="Search items, colors, categories..." />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <RefinementList attribute="category" />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <RefinementList attribute="color" />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Sort</h3>
              <SortBy
                items={[
                  { value: indexName, label: 'Relevance' },
                  { value: `${indexName}_price_asc`, label: 'Price ↑' },
                  { value: `${indexName}_price_desc`, label: 'Price ↓' }
                ]}
              />
            </div>
          </div>
        </aside>

        <section className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Search results</h2>
          </div>

          <HitsGrid onSelect={id => setSelectedId(id)} />

          <div className="mt-8">
            <SelectedItemCard item={selectedItem} onSelect={id => setSelectedId(id)} />
          </div>
        </section>
      </div>
    </InstantSearch>
  )
}
