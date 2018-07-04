import Account from '../../core/models/account'

export default interface AccountsRepository {
  async getAccountByEmail(email: string): Promise<Account>
}