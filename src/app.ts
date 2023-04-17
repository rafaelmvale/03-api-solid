import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import FastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

app.register(FastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation errors', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // aplicar logs para produção (Datadog e etc)
  }
  return reply.status(500).send({ messsage: 'Internal server error' })
})
