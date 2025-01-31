// lib/db.ts
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

interface Post {
  title: string
  date: string
  content: string
  excerpt: string
}

// Initialize database connection
export async function openDb() {
  return open({
    filename: './blog.db',
    driver: sqlite3.Database
  })
}

export async function getPosts(): Promise<Post[]> {
  const db = await openDb()
  const posts = await db.all<Post[]>(`
    SELECT slug, title, date, excerpt
    FROM posts
    ORDER BY date DESC
  `)
  await db.close()
  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const db = await openDb()
  try {
    const post = await db.get<Post>(`
      SELECT title, date, content, excerpt
      FROM posts
      WHERE slug = ?
    `, [slug])
    
    return post || null
  } finally {
    await db.close()
  }
}

export async function getAllPostNames(): Promise<string[]> {
  const db = await openDb()
  try {
    const posts = await db.all<{ slug: string }[]>('SELECT slug FROM posts')
    return posts.map(post => post.slug)
  } finally {
    await db.close()
  }
}