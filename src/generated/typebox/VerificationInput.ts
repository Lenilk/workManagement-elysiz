import { Type, Static } from "@sinclair/typebox";

export const VerificationInput = Type.Object({
  id: Type.String(),
  identifier: Type.String(),
  value: Type.String(),
  expiresAt: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
});

export type VerificationInputType = Static<typeof VerificationInput>;
