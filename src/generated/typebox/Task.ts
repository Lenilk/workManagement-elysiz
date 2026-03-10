import { Type, Static } from "@sinclair/typebox";

export const Task = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  detail: Type.Optional(Type.String()),
  loc: Type.Optional(Type.String()),
  workerName: Type.Optional(Type.String()),
  workerId: Type.Optional(Type.String()),
  user: Type.Optional(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      email: Type.String(),
      emailVerified: Type.Boolean(),
      image: Type.Optional(Type.String()),
      createdAt: Type.String(),
      updatedAt: Type.String(),
      role: Type.Optional(Type.String()),
      approve: Type.Optional(Type.Boolean()),
    })
  ),
  status: Type.Optional(Type.String()),
  workResult: Type.Optional(Type.String()),
  gps: Type.Optional(Type.String()),
  completedAt: Type.Optional(Type.String()),
  createdAt: Type.Optional(Type.String()),
  deadlineAt: Type.Optional(Type.String()),
  imageName: Type.Optional(Type.String()),
});

export type TaskType = Static<typeof Task>;
