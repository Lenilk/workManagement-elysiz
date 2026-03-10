import { Type, Static } from "@sinclair/typebox";

export const AccountInput = Type.Object({
  id: Type.String(),
  accountId: Type.String(),
  providerId: Type.String(),
  userId: Type.String(),
  user: Type.Object({
    id: Type.String(),
    name: Type.String(),
    email: Type.String(),
    emailVerified: Type.Boolean(),
    image: Type.Optional(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    role: Type.Optional(Type.String()),
    approve: Type.Optional(Type.Boolean()),
  }),
  accessToken: Type.Optional(Type.String()),
  refreshToken: Type.Optional(Type.String()),
  idToken: Type.Optional(Type.String()),
  accessTokenExpiresAt: Type.Optional(Type.String()),
  refreshTokenExpiresAt: Type.Optional(Type.String()),
  scope: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

export type AccountInputType = Static<typeof AccountInput>;
