// app/posts/[slug]/page.tsx
import { getPost, getAllPostNames } from '@/lib/posts_db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  return {
    title: post.title,
    description: post.excerpt
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostNames()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <article className="container mx-auto px-4 max-w-3xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <header className="mb-8">
              <h1 className="card-title text-4xl font-bold mb-2">{post.title}</h1>
              <time className="text-sm opacity-70">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </header>

            <div className="divider"></div>

            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>

            <div className="card-actions justify-start mt-8">
              <a
                href="/"
                className="btn btn-ghost gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 stroke-current"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to all posts
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}