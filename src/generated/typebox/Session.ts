import { Type, Static } from "@sinclair/typebox";

export const Session = Type.Object({
  id: Type.String(),
  expiresAt: Type.String(),
  token: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  ipAddress: Type.Optional(Type.String()),
  userAgent: Type.Optional(Type.String()),
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
});

export type SessionType = Static<typeof Session>;
