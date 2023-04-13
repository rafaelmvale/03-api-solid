import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateChekInUseCase } from '../validate-check-in'

export function makeValidateChekInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateChekInUseCase(checkInsRepository)

  return useCase
}
