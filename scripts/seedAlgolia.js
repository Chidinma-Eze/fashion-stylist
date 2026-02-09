const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')

async function main() {
  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const adminKey = process.env.ALGOLIA_ADMIN_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'fashion_items'

  if (!appId || !adminKey) {
    console.error('Missing NEXT_PUBLIC_ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY in environment')
    process.exit(1)
  }

  const client = algoliasearch(appId, adminKey)
  const index = client.initIndex(indexName)

  const dataPath = path.join(__dirname, '..', 'data', 'fashion-items.json')
  const raw = fs.readFileSync(dataPath, 'utf8')
  const records = JSON.parse(raw)

  // Ensure objectID is present on each record
  const withIds = records.map(r => ({ ...r, objectID: String(r.objectID) }))

  console.log(`Uploading ${withIds.length} records to Algolia index: ${indexName}`)

  try {
    const resp = await index.saveObjects(withIds)
    console.log('Indexing task:', resp)
    console.log('Done.')
  } catch (err) {
    console.error('Failed to index records:', err)
    process.exit(1)
  }
}

main()
