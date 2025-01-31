// app/posts/[slug]/page.tsx
import { getPost, getAllPostNames} from '@/lib/posts_db'
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
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-500">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </header>
      
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
      
      <div className="mt-8 pt-4 border-t">
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to all posts
        </a>
      </div>
    </article>
  )
}

