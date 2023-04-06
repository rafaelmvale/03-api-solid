import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface ChekInUseCaseRequest {
  userId: string
  gymId: string
}

interface ChekInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepoitory: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ChekInUseCaseRequest): Promise<ChekInUseCaseResponse> {
    const checkIn = await this.checkInsRepoitory.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
