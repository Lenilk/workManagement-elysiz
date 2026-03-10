import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TaskPlain = t.Object(
  {
    id: t.Integer(),
    title: t.String(),
    detail: __nullable__(t.String()),
    loc: __nullable__(t.String()),
    workerName: __nullable__(t.String()),
    workerId: __nullable__(t.String()),
    status: __nullable__(t.String()),
    workResult: __nullable__(t.String()),
    gps: __nullable__(t.String()),
    completedAt: __nullable__(t.Date()),
    createdAt: t.Date(),
    deadlineAt: __nullable__(t.Date()),
    imageName: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const TaskRelations = t.Object(
  {
    user: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          email: t.String(),
          emailVerified: t.Boolean(),
          image: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          role: t.String(),
          approve: __nullable__(t.Boolean()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TaskPlainInputCreate = t.Object(
  {
    title: t.String(),
    detail: t.Optional(__nullable__(t.String())),
    loc: t.Optional(__nullable__(t.String())),
    workerName: t.Optional(__nullable__(t.String())),
    status: t.Optional(__nullable__(t.String())),
    workResult: t.Optional(__nullable__(t.String())),
    gps: t.Optional(__nullable__(t.String())),
    completedAt: t.Optional(__nullable__(t.Date())),
    deadlineAt: t.Optional(__nullable__(t.Date())),
    imageName: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TaskPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    detail: t.Optional(__nullable__(t.String())),
    loc: t.Optional(__nullable__(t.String())),
    workerName: t.Optional(__nullable__(t.String())),
    status: t.Optional(__nullable__(t.String())),
    workResult: t.Optional(__nullable__(t.String())),
    gps: t.Optional(__nullable__(t.String())),
    completedAt: t.Optional(__nullable__(t.Date())),
    deadlineAt: t.Optional(__nullable__(t.Date())),
    imageName: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TaskRelationsInputCreate = t.Object(
  {
    user: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TaskRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const TaskWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          title: t.String(),
          detail: t.String(),
          loc: t.String(),
          workerName: t.String(),
          workerId: t.String(),
          status: t.String(),
          workResult: t.String(),
          gps: t.String(),
          completedAt: t.Date(),
          createdAt: t.Date(),
          deadlineAt: t.Date(),
          imageName: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Task" },
  ),
);

export const TaskWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.Integer() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.Integer() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              title: t.String(),
              detail: t.String(),
              loc: t.String(),
              workerName: t.String(),
              workerId: t.String(),
              status: t.String(),
              workResult: t.String(),
              gps: t.String(),
              completedAt: t.Date(),
              createdAt: t.Date(),
              deadlineAt: t.Date(),
              imageName: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Task" },
);

export const TaskSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      detail: t.Boolean(),
      loc: t.Boolean(),
      workerName: t.Boolean(),
      workerId: t.Boolean(),
      user: t.Boolean(),
      status: t.Boolean(),
      workResult: t.Boolean(),
      gps: t.Boolean(),
      completedAt: t.Boolean(),
      createdAt: t.Boolean(),
      deadlineAt: t.Boolean(),
      imageName: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TaskInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TaskOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      detail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      loc: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      workerName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      workerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      workResult: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      gps: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      completedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deadlineAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Task = t.Composite([TaskPlain, TaskRelations], {
  additionalProperties: false,
});

export const TaskInputCreate = t.Composite(
  [TaskPlainInputCreate, TaskRelationsInputCreate],
  { additionalProperties: false },
);

export const TaskInputUpdate = t.Composite(
  [TaskPlainInputUpdate, TaskRelationsInputUpdate],
  { additionalProperties: false },
);
