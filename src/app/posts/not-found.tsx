// app/posts/[slug]/not-found.tsx
export default function NotFound() {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-8">Sorry, the post you're looking for doesn't exist.</p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to all posts
        </a>
      </div>
    )
  }