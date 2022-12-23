import type { allowedUsers } from '@prisma/client'

import {
  allowedUsers,
  allowedUsers,
  createAllowedUsers,
  updateAllowedUsers,
  deleteAllowedUsers,
} from './allowedUsers'
import type { StandardScenario } from './allowedUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('allowedUsers', () => {
  scenario('returns all allowedUsers', async (scenario: StandardScenario) => {
    const result = await allowedUsers()

    expect(result.length).toEqual(Object.keys(scenario.allowedUsers).length)
  })

  scenario(
    'returns a single allowedUsers',
    async (scenario: StandardScenario) => {
      const result = await allowedUsers({ id: scenario.allowedUsers.one.id })

      expect(result).toEqual(scenario.allowedUsers.one)
    }
  )

  scenario('creates a allowedUsers', async (scenario: StandardScenario) => {
    const result = await createAllowedUsers({
      input: {
        postId: scenario.allowedUsers.two.postId,
        userId: scenario.allowedUsers.two.userId,
      },
    })

    expect(result.postId).toEqual(scenario.allowedUsers.two.postId)
    expect(result.userId).toEqual(scenario.allowedUsers.two.userId)
  })

  scenario('updates a allowedUsers', async (scenario: StandardScenario) => {
    const original = (await allowedUsers({
      id: scenario.allowedUsers.one.id,
    })) as allowedUsers
    const result = await updateAllowedUsers({
      id: original.id,
      input: { postId: scenario.allowedUsers.two.postId },
    })

    expect(result.postId).toEqual(scenario.allowedUsers.two.postId)
  })

  scenario('deletes a allowedUsers', async (scenario: StandardScenario) => {
    const original = (await deleteAllowedUsers({
      id: scenario.allowedUsers.one.id,
    })) as allowedUsers
    const result = await allowedUsers({ id: original.id })

    expect(result).toEqual(null)
  })
})
