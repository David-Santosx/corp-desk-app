import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: {
        expiresIn: 60 * 2 * 60, // 7200 segundos = 2 horas
    },
    plugins: [
        admin(),
        nextCookies()
    ]
});