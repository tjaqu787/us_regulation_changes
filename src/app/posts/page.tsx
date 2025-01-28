// app/page.tsx
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
}

// Add export const revalidate = false to ensure static generation
export const revalidate = false

// Add generateStaticParams if you have dynamic routes
// Not needed in this case since this is the index page

// Mark the page component with 'use client' if you need client interactivity
// Not needed in this case since it's a server component

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt
      }
    })
  )
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// Add generateMetadata for better SEO (optional)
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
          <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <time className="text-gray-500 text-sm">{post.date}</time>
              <p className="mt-4">{post.excerpt}</p>
              
                href={`/posts/${post.slug}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                <a>
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}