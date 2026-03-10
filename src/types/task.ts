//         csv += `${t.id},${t.title},${t.detail},${t.loc},${t.workerName},${t.status},${t.workResult || '-'},${t.gps || '-'},${t.completedAt || '-'}\n`;
import { Static, t } from "elysia";
interface DefaultTask {
  id: number;
  title: string;
  detail: string;
  loc: string;
  workerId: String;
  workerName: string;
  status: "pending" | "complete";
  workResult: string | "";
  gps: string | null;
  completedAt: Date | null;
  createdAt: Date;
  deadlineAt: Date;
}
export interface Task {
  title: string;
  detail: string;
  loc: string;
  workerId: string;
  workerName: string;
  status: string;
  workResult?: string | null;
  gps?: string | null;
  deadlineAt: string;
}
export interface CreateTask {
  title: string;
  detail: string;
  loc: string;
  workerName: string;
  status: string;
  workResult?: string | null;
  gps?: string | null;
  deadlineAt: string;
}
export type task = typeof TaskObject.static;
export const TaskObject = t.Object({
  title: t.String(),
  detail: t.Optional(t.String()),
  loc: t.Optional(t.String()),
  workerId: t.Optional(t.String()),
  workerName: t.Optional(t.String()),
  status: t.Optional(t.String()),
  workResult: t.Optional(t.String()),
  imageName: t.Optional(t.String()),
  gps: t.Optional(t.String()),
  deadlineAt: t.Date(),
});
export const UpdateTaskObject = t.Object({
  title: t.Optional(t.String()),
  detail: t.Optional(t.String()),
  loc: t.Optional(t.String()),
  workerId: t.Optional(t.String()),
  workerName: t.Optional(t.String()),
  status: t.Optional(t.String()),
  workResult: t.Optional(t.String()),
  gps: t.Optional(t.String()),
  deadlineAt: t.Optional(t.Date()),
});
export type updatetask = typeof UpdateTaskObject.static;
export const DefaultTaskObject = t.Object({
  id: t.Integer() || t.Null(),
  title: t.String(),
  detail: t.String(),
  loc: t.String(),
  workerId: t.String(),
  workerName: t.String(),
  status: t.String(),
  workResult: t.String(),
  gps: t.String() || t.Null(),
  completedAt: t.Date() || t.Null(),
  createdAt: t.Date(),
  deadlineAt: t.Date(),
});
