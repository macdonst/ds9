// View documentation at: https://docs.begin.com
import { getBook, upsertBook, validate } from '../../../models/books.mjs'

export async function get (req) {
  if (req.session.problems) {
    let { problems, book, ...session } = req.session
    return {
      session,
      json: { problems, book }
    }
  }

  const id = req.pathParameters?.id
  const result = await getBook(id)
  return {
    json: { book: result }
  }
}

export async function post (req) {
  const id = req.pathParameters?.id

  // Validate
  let { problems, book } = await validate.update(req)
  if (problems) {
    return {
      session: { problems, book },
      json: { problems, book },
      location: `/books/${book.key}`
    }
  }

  try {
    const result = await upsertBook({key: id, ...book})
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
