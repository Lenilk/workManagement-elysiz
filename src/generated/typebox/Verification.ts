import { Type, Static } from "@sinclair/typebox";

export const Verification = Type.Object({
  id: Type.String(),
  identifier: Type.String(),
  value: Type.String(),
  expiresAt: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
});

export type VerificationType = Static<typeof Verification>;
