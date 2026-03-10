import { Type, Static } from "@sinclair/typebox";

export const UserInput = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  emailVerified: Type.Boolean(),
  image: Type.Optional(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  sessions: Type.Array(
    Type.Object({
      id: Type.String(),
      expiresAt: Type.String(),
      token: Type.String(),
      createdAt: Type.String(),
      updatedAt: Type.String(),
      ipAddress: Type.Optional(Type.String()),
      userAgent: Type.Optional(Type.String()),
      userId: Type.String(),
    })
  ),
  accounts: Type.Array(
    Type.Object({
      id: Type.String(),
      accountId: Type.String(),
      providerId: Type.String(),
      userId: Type.String(),
      accessToken: Type.Optional(Type.String()),
      refreshToken: Type.Optional(Type.String()),
      idToken: Type.Optional(Type.String()),
      accessTokenExpiresAt: Type.Optional(Type.String()),
      refreshTokenExpiresAt: Type.Optional(Type.String()),
      scope: Type.Optional(Type.String()),
      password: Type.Optional(Type.String()),
      createdAt: Type.String(),
      updatedAt: Type.String(),
    })
  ),
  tasks: Type.Array(
    Type.Object({
      id: Type.Optional(Type.Number()),
      title: Type.String(),
      detail: Type.Optional(Type.String()),
      loc: Type.Optional(Type.String()),
      workerName: Type.Optional(Type.String()),
      workerId: Type.Optional(Type.String()),
      status: Type.Optional(Type.String()),
      workResult: Type.Optional(Type.String()),
      gps: Type.Optional(Type.String()),
      completedAt: Type.Optional(Type.String()),
      createdAt: Type.Optional(Type.String()),
      deadlineAt: Type.Optional(Type.String()),
      imageName: Type.Optional(Type.String()),
    })
  ),
  role: Type.Optional(Type.String()),
  approve: Type.Optional(Type.Boolean()),
});

export type UserInputType = Static<typeof UserInput>;
