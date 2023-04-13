import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateChekInUseCaseRequest {
  checkInId: string
}

interface ValidateChekInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateChekInUseCase {
  constructor(private checkInsRepoitory: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateChekInUseCaseRequest): Promise<ValidateChekInUseCaseResponse> {
    const checkIn = await this.checkInsRepoitory.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesInCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )
    if (distanceInMinutesInCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepoitory.save(checkIn)
    return {
      checkIn,
    }
  }
}
