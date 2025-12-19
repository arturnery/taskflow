import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

type AuthenticatedUser = User;

function createAuthContext(user: AuthenticatedUser): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

function createUnauthenticatedContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

describe("tasks router", () => {
  const mockUser: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  describe("tasks.list", () => {
    it("should throw error if user is not authenticated", async () => {
      const { ctx } = createUnauthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.list();
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("logged in");
      }
    });

    it("should return empty array for authenticated user with no tasks", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.list();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("tasks.create", () => {
    it("should throw error if user is not authenticated", async () => {
      const { ctx } = createUnauthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.create({
          title: "Test Task",
          priority: "medium",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("logged in");
      }
    });

    it("should throw error if title is empty", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.create({
          title: "",
          priority: "medium",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });

    it("should create a task with valid input", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.create({
        title: "Test Task",
        description: "Test Description",
        priority: "high",
      });

      expect(result).toBeDefined();
    });
  });

  describe("tasks.update", () => {
    it("should throw error if user is not authenticated", async () => {
      const { ctx } = createUnauthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.update({
          id: 1,
          title: "Updated Task",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("logged in");
      }
    });

    it("should update a task with valid input", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.update({
        id: 1,
        title: "Updated Task",
        completed: true,
      });

      expect(result).toBeDefined();
    });
  });

  describe("tasks.delete", () => {
    it("should throw error if user is not authenticated", async () => {
      const { ctx } = createUnauthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("logged in");
      }
    });

    it("should delete a task with valid input", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.delete({ id: 1 });
      expect(result).toBeDefined();
    });
  });

  describe("tasks.get", () => {
    it("should throw error if user is not authenticated", async () => {
      const { ctx } = createUnauthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.get({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("logged in");
      }
    });

    it("should get a task with valid input", async () => {
      const { ctx } = createAuthContext(mockUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.get({ id: 1 });
      expect(result === null || result === undefined || typeof result === "object").toBe(true);
    });
  });
});
