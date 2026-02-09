import SearchPage from '../components/SearchPage'

export default function Page() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Virtual Fashion Stylist</h1>
        <p className="text-gray-600 mt-1">Search, select, and complete the look.</p>
      </header>

      <SearchPage />
    </div>
  )
}
