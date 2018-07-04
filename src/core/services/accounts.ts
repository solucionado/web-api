import AccountsRepository from '../../adapters/repositories/accounts'
import { Services } from '../../application'

export interface AccountsServiceDependencies {
  accountsRepository: AccountsRepository,
  services?: Services
}
export interface AccountsService {
  createAccount (email: string, password: string, phoneNumber: string)
}

export default (deps: AccountsServiceDependencies): AccountsService => {
  return {
    async createAccount (emai, password, phoneNumber) {

    }
  } as AccountsService
}
