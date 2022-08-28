// View documentation at: https://docs.begin.com
import { deleteBook } from '../../../../models/books.mjs'

export async function post (req) {
  const id = req.pathParameters?.id

  try {
    await deleteBook(id)
    return {
      session: {},
      json: null,
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
