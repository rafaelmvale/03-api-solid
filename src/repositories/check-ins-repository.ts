import { Gym, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Gym>
}
