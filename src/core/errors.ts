export class CoreError extends Error {
  code: string
  type: string
  details: any
  data: any
  field: any

  constructor (params: any = {}) {
    const {
      message = 'Internal Server Error',
      code,
      type = 'core_error',
      details,
      data,
      field
    } = params
    super(message)
    this.code = code
    this.type = type
    this.details = details
    this.data = data
    this.field = field
    this.name = 'CoreError'
  }
}
export class ValidationError extends CoreError {
  constructor (params: any) {
    super(params)
    this.name = 'ValidationError'
  }
}
