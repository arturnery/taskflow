import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, Edit2 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading, refetch } = trpc.tasks.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Mutations
  const createMutation = trpc.tasks.create.useMutation({
    onSuccess: () => {
      setNewTaskTitle("");
      setNewTaskPriority("medium");
      refetch();
      toast.success("Task created!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });

  const updateMutation = trpc.tasks.update.useMutation({
    onSuccess: () => {
      setEditingId(null);
      refetch();
      toast.success("Task updated!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update task");
    },
  });

  const deleteMutation = trpc.tasks.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Task deleted!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    createMutation.mutate({
      title: newTaskTitle,
      priority: newTaskPriority as "low" | "medium" | "high",
    });
  };

  const handleToggleComplete = (taskId: number, completed: boolean) => {
    updateMutation.mutate({
      id: taskId,
      completed: !completed,
    });
  };

  const handleDeleteTask = (taskId: number) => {
    deleteMutation.mutate({ id: taskId });
  };

  const handleStartEdit = (taskId: number, title: string) => {
    setEditingId(taskId);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    if (!editingTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        title: editingTitle,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>TaskFlow</CardTitle>
            <CardDescription>Manage your tasks efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="w-full"
              size="lg"
            >
              Sign In to Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-gray-600">Welcome, {user?.name || "User"}!</p>
          </div>
          <Button variant="outline" onClick={() => logout()}>
            Sign Out
          </Button>
        </div>

        {/* Create Task Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-col md:flex-row">
              <Input
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateTask()}
                className="flex-1"
              />
              <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleCreateTask}
                disabled={createMutation.isPending}
                className="gap-2"
              >
                {createMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasksLoading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : tasks.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No tasks yet. Create one to get started!</p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleComplete(task.id, task.completed)}
                    />
                    <div className="flex-1">
                      {editingId === task.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
                            className="flex-1"
                          />
                          <Button size="sm" onClick={handleSaveEdit}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`text-lg ${
                              task.completed ? "line-through text-gray-500" : "text-gray-900"
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-sm text-gray-600">{task.description}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(task.id, task.title)}
                        disabled={editingId !== null}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
