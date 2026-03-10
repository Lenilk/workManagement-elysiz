import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  trustedOrigins: [process.env.CLIENT_URL ?? ""],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["worker", "admin"],
        required: false,
        defaultValue: "worker",
        input: true,
      },
      approve: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false, // don't allow user to set role
      },
    },
  },
});
