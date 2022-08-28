// View documentation at: https://docs.begin.com
import { getBooks, upsertBook, validate } from '../../models/books.mjs'

export async function get (req) {
  const books = await getBooks()
  if (req.session.problems) {
    let { problems, book,...session } = req.session
    return {
      session,
      json: { problems, books, book }
    }
  }

  return {
    json: { books }
  }
}

export async function post (req) {
  // Validate
  let { problems, book } = await validate.create(req)
  if (problems) {
    return {
      session: { problems, book },
      json: { problems, book },
      location: '/books'
    }
  }

  try {
    const result = await upsertBook(book)
    return {
      session: {},
      json: { book: result },
      location: '/books'
    }
  }
  catch (err) {
    return {
      session: { error: err.message },
      json: { error: err.message },
      location: '/books'
    }
  }
}
