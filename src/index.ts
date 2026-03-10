import { Context, Elysia, t } from "elysia";
import { auth } from "./lib/auth";
import cors from "@elysiajs/cors";
import {
  GetAllUsers,
  getWorker,
  UpdateApproveInUser,
  UpdateRoleInUser,
} from "./lib/user";
import {
  claimSingleTask,
  createSingleTask,
  deleteSingleTask,
  finishSingleTask,
  getAllTasks,
  getClaimedTasks,
  getFinishedTask,
  getPendingTask,
  getSingleTask,
  updateSingleTask,
} from "./lib/task";
import { DefaultTaskObject, TaskObject, UpdateTaskObject } from "./types/task";
import { TaskPlainInputCreate } from "./generated/prismabox/Task";
import openapi, { fromTypes } from "@elysiajs/openapi";
import { prisma } from "./lib/prisma";
import { filenameSchema } from "./utils/filenameschema";
const betterAuthView = ({ request, set }: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(request.method)) {
    return auth.handler(request);
  }
  set.status = 405;
  return "Method Not Allowed";
};
const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
    }),
  )
  .use(
    cors({
      origin: "http://localhost:5173", // URL ของ Vite Frontend
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true, // สำคัญมาก! สำหรับการส่ง Cookie/Session
    }),
  )
  .group("/api", (app) =>
    app
      .all("/auth/*", betterAuthView)
      .group("/user", (app) =>
        app
          .get("/", GetAllUsers)
          .get("/worker", (context) => getWorker(context))
          .put(
            "/approve",
            (context) => UpdateApproveInUser(context, context.body),
            {
              body: t.Object({
                id: t.String(),
                approve: t.Boolean(),
              }),
            },
          )

          .put("/role", (context) => UpdateRoleInUser(context, context.body), {
            body: t.Object({
              id: t.String(),
              role: t.String(),
            }),
          }),
      )
      .group("/task", (app) =>
        app
          .get("/", (context) => getAllTasks(context))
          .get("/pending", (context) => getPendingTask(context))
          .get("/claimed", (context) => getClaimedTasks(context))
          .get("/finished", (context) => getFinishedTask(context))

          .post("/", (context) => createSingleTask(context, context.body), {
            body: TaskObject,
          })
          .post(
            "/finishTask",
            (context) => finishSingleTask(context, context.body),
            {
              body: t.Object({
                id: t.Integer(),
                status: t.String(),
                gps: t.Union([t.String(), t.Null()]),
                workResult: t.String(),
                image: t.File({ type: "image/*" }),
              }),
            },
          )
          .put(
            "/claimTask",
            (context) => claimSingleTask(context, context.body),
            {
              body: t.Object({
                id: t.Integer(),
              }),
            },
          )
          .group("/:id", (app) =>
            app
              .get("", getSingleTask)
              .put("", (context) => updateSingleTask(context, context.body), {
                body: UpdateTaskObject,
              })
              .delete("", deleteSingleTask),
          ),
      )
      .get(
        "/picture/:filename",
        async (context: Context) => {
          const filename = filenameSchema.parse(context.params.filename);
          const filePath = `./src/picture/${filename}`;

          try {
            // const file = await prisma.file.findUnique({
            //   where: { filename },
            // });
            const file = Bun.file(filePath);
            if (!(await file.exists())) {
              context.set.status = 404;
              return "File not found";
            }
            return file;
          } catch (error) {
            console.error("Error fetching file:", error);
            context.set.status = 500;
            return "Internal Server Error";
          }
        },
        {
          params: t.Object({
            // ใช้ RegExp ใน Elysia Type System เพื่อกรองชื่อไฟล์
            // อนุญาตเฉพาะ ตัวอักษร, ตัวเลข, ขีดกลาง, จุด และ underscore เท่านั้น
            filename: t.String({
              pattern: "^[a-zA-Z0-9._\\s-]+$",
              error: "Invalid filename format",
            }),
          }),
        },
      ),
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
