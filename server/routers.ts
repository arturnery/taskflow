import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserTasks, getTaskById, createTask, updateTask, deleteTask } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tasks: router({
    list: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view tasks",
        });
      }
      return getUserTasks(ctx.user.id);
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to view tasks",
          });
        }
        return getTaskById(input.id, ctx.user.id);
      }),

    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().optional(),
          priority: z.enum(["low", "medium", "high"]).default("medium"),
          dueDate: z.date().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to create tasks",
          });
        }
        return createTask({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          priority: input.priority,
          dueDate: input.dueDate,
        });
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          completed: z.boolean().optional(),
          priority: z.enum(["low", "medium", "high"]).optional(),
          dueDate: z.date().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to update tasks",
          });
        }
        const { id, ...updates } = input;
        return updateTask(id, ctx.user.id, updates);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to delete tasks",
          });
        }
        return deleteTask(input.id, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
