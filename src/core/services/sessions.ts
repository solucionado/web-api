import SessionsRepository from '../../adapters/repositories/sessions'
import { Services } from '../../application'

export interface SessionsServiceDependencies {
  sessionsRepository: SessionsRepository,
  services: Services
}

export interface SessionsService {}

export default (deps: SessionsServiceDependencies): SessionsService => {
  return {

  } as SessionsService
}
