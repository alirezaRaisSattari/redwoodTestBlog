import type { Prisma, allowedUsers } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.allowedUsersCreateArgs>({
  allowedUsers: {
    one: {
      data: {
        post: {
          create: {
            title: 'String',
            body: 'String',
            user: {
              create: {
                email: 'String9093531',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String6279718',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        post: {
          create: {
            title: 'String',
            body: 'String',
            user: {
              create: {
                email: 'String4114646',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String1245476',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<allowedUsers, 'allowedUsers'>
