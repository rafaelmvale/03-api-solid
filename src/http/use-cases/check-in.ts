import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

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
    const checkInOnSameDay = await this.checkInsRepoitory.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepoitory.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
