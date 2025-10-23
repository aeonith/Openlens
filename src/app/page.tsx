import Feed from '@/components/Feed'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Latest Articles</h1>
        <p className="text-gray-400">Discover evidence-backed content from the community</p>
      </div>
      <Feed />
    </div>
  )
}
