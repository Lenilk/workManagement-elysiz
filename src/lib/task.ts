import { prisma } from "./prisma";
import { auth } from "./auth";
import { Context } from "elysia";
import {
  TaskCreateInput,
  TaskUncheckedCreateInput,
} from "../generated/prisma/models";
import { Prisma } from "../generated/prisma/client";
import { TaskPlainInputCreate } from "../generated/prismabox/Task";
import { CreateTask, task, Task, updatetask } from "../types/task";
import { connect } from "bun";
// get all task
export async function getAllTasks(context: Context) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  return await prisma.task.findMany();
  // const session = await auth.api.getSession({
  //   headers: context.request.headers,
  // });
  // if (session == null || session?.user.approve == false) {
  //   context.set.status = 203;

  //   return "Error unauthorization";
  // }
  // if (session.user.role == "admin") {
  //   return await prisma.task.findMany();
  // } else if (session.user.role == "worker") {
  //   return await prisma.task.findMany({ where: { workerId: session.user.id } });
  // } else {
  //   context.set.status = 203;
  //   return "Error unauthorization";
  // }
}

export async function getPendingTask(context: Context) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  return await prisma.task.findMany({
    where: {
      OR: [
        { workerId: null },
        { status: "pending", workerId: session.user.id },
      ],
    },
  });
}
export async function getClaimedTasks(context: Context) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  return await prisma.task.findMany({
    where: { status: "claimed", workerId: session.user.id },
  });
}
// create task
export async function createSingleTask(context: Context, body: task) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  console.log(body);
  if (session.user.role == "admin") {
    try {
      await prisma.task.create({
        data: body,
      });
    } catch (e) {
      console.log(e);
    }
  } else if (session.user.role == "worker") {
    try {
      await prisma.task.create({
        data: {
          ...body,
          workerId: session.user.id,
          workerName: session.user.name,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  return body;
}
// get single task
export async function getSingleTask(context: Context) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  try {
    let res = await prisma.task.findFirst({
      where: { id: Number(context.params.id) },
    });
    if (res) {
      return res;
    } else {
      context.set.status = 404;
      return "Not Found";
    }
  } catch (e) {
    console.log(e);
  }
}
// update single task
export async function updateSingleTask(context: Context, body: updatetask) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  try {
    let res = await prisma.task.update({
      where: { id: Number(context.params.id) },
      data: body,
    });
    if (res) {
      return res;
    } else {
      context.set.status = 404;
      return "Not Found";
    }
  } catch (e) {
    console.log(e);
  }
}
//delete single task
export async function deleteSingleTask(context: Context) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  try {
    let res = await prisma.task.delete({
      where: { id: Number(context.params.id) },
    });
    if (res) {
      return res;
    } else {
      context.set.status = 404;
      return "Not Found";
    }
  } catch (e) {
    console.log(e);
  }
}

export async function claimSingleTask(context: Context, body: { id: Number }) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  try {
    let res = await prisma.task.update({
      where: { id: Number(body.id) },
      data: {
        workerId: session.user.id,
        workerName: session.user.name,
        status: "claimed",
      },
    });
    if (res) {
      return res;
    } else {
      context.set.status = 404;
      return "Not Found";
    }
  } catch (e) {
    console.log(e);
  }
}

export async function finishSingleTask(
  context: Context,
  body: {
    id: Number;
    status: string;
    gps: string | null;
    workResult: string;
    image: File;
  },
) {
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  const mimeType = body.image.type; // เช่น "image/jpeg", "image/png"

  // 2. กำหนดนามสกุลไฟล์ตาม Type
  let extension = "";
  switch (mimeType) {
    case "image/jpeg":
      extension = "jpg";
      break;
    case "image/png":
      extension = "png";
      break;
  }
  const imageName = `${session.user.id}_${body.id}${Date.now()}.${extension}`;
  await Bun.write(`./src/picture/${imageName}`, body.image);
  try {
    let res = await prisma.task.update({
      where: { id: Number(body.id), workerId: session.user.id },
      data: {
        workResult: body.workResult,
        imageName: imageName,
        gps: body.gps,
        status: body.status,
        completedAt: new Date(),
      },
    });
    if (res) {
      return res;
    } else {
      context.set.status = 404;
      return "Not Found";
    }
  } catch (e) {
    console.log(e);
  }
}
export async function getFinishedTask(context: Context) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  console.log(session);
  if (!session || session?.user.approve == false) {
    context.set.status = 203;
    return "Error unauthorization";
  }
  return await prisma.task.findMany({
    where: {
      OR: [{ status: "failed" }, { status: "completed" }],
      workerId: session.user.id,
    },
  });
}
