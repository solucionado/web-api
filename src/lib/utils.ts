export const isReadableContent = body => {
  try {
    return typeof (body) === 'object' && (body.constructor.name === 'ReadStream' || body.constructor.name === 'BodyTransParserStream')
  } catch (ignore) {
    return false
  }
}

export const readableToString = readable =>
  new Promise((resolve, reject) => {
    let data
    readable.on('data', chunk => data ? data += chunk : data = chunk)
    readable.on('end', err => {
      if (err) {
        return reject(err)
      }
      resolve(data.toString())
    })
  })
