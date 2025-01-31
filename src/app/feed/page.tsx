import { Post, getPosts } from '@/lib/posts_db'

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
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-4xl font-bold my-8 text-primary">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.title} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <time className="text-sm opacity-70">{post.date}</time>
              <p className="py-2">{post.excerpt}</p>
              <div className="card-actions justify-end">
                <a
                  href={`/posts/${post.title}`}
                  className="btn btn-primary btn-sm"
                >
                  Read more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 ml-1 stroke-current"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}