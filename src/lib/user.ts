import { prisma } from "./prisma";
import { auth } from "./auth";
import { Context, BodyHandler } from "elysia";
export async function GetAllUsers(context: Context) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  if (session?.user.role == "admin" && session.user.approve == true) {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, approve: true },
    });
  } else {
    context.set.status = 203;
    return "Error unauthorization";
  }
}
interface UpdateApproveInUserBody {
  id: string;
  approve: boolean;
}
export async function UpdateApproveInUser(
  context: Context,
  body: UpdateApproveInUserBody,
) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  if (session?.user.role == "admin" && session.user.approve == true) {
    await prisma.user.update({
      where: { id: body.id },
      data: { approve: body.approve },
    });
    return "successful";
  } else {
    context.set.status = 203;
    return "Error unauthorization";
  }
}
export async function UpdateRoleInUser(
  context: Context,
  body: { id: string; role: string },
) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  if (session?.user.role == "admin" && session.user.approve == true) {
    await prisma.user.update({
      where: { id: body.id },
      data: { role: body.role },
    });
    return "successful";
  } else {
    context.set.status = 203;
    return "Error unauthorization";
  }
}

export async function getWorker(context: Context) {
  let session = await auth.api.getSession({ headers: context.request.headers });
  if (session?.user.role == "admin" && session.user.approve == true) {
    return await prisma.user.findMany({
      where: { role: "worker", approve: true },
    });
  } else {
    context.set.status = 203;
    return "Error unauthorization";
  }
}
