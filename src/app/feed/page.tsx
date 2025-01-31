import {Post, getPosts } from '@/lib/posts_db'


export const revalidate = false


export async function generateMetadata() {
  return {
    title: 'Blog',
    description: 'My blog posts'
  }
}

export default async function ChangeFeed() {
  const posts = await getPosts()
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <time className="text-gray-500 text-sm">{post.date}</time>
              <p className="mt-4">{post.excerpt}</p>
              <a 
                href={`/posts/${post.title}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}