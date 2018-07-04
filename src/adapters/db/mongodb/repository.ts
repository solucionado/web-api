import AccountsRepository from '../../repositories/accounts'

export const accountsRepository = (mongoClient): AccountsRepository => {
  const collection = mongoClient.db.collection('accounts')
  return {
    async getAccountByEmail (email: string) {
      return collection.findOne({
        email
      })
    }
  } as AccountsRepository
}
