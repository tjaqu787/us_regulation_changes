// app/posts/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md w-full m-4">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-4xl font-bold mb-4">404</h1>
          <h2 className="text-2xl mb-2">Post Not Found</h2>
          <p className="mb-8 opacity-70">Sorry, the post you're looking for doesn't exist.</p>
          <div className="card-actions">
            <a
              href="/"
              className="btn btn-primary gap-2"
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
    </div>
  )
}