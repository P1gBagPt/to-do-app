"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";

import { TodoListCreatePostModel, TodoListGetModel } from "@/types/todolist";
import { getAllTasks, todoListAction } from "./actions";
import TodoListTable from "./table/page";
import { useToast } from "@/hooks/use-toast";

// Define the TodoListPostModel interface
interface TodoListPostModel {
  title: string;
  description: string;
  category: string;
  state: string;
  created_at?: string;
  userId?: string;
}

// Schema for validation using yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  state: yup.string().required("State is required"),
});

export default function ToDoList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState<
    { name: string; color: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TodoListGetModel[]>([]);
  const { toast } = useToast();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    control,
  } = useForm<TodoListPostModel>({
    resolver: yupResolver(schema),
  });

  const stateValue = useWatch({ control, name: "state" }); // Watch the state value

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await fetch("/status/status.json");
        if (!response.ok) {
          throw new Error("Failed to fetch status options");
        }
        const data = await response.json();
        setStatusOptions(data.status);
      } catch (error) {
        console.error("Error fetching status options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusOptions();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch tasks. Please try again later.",
      });
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch tasks. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [toast]);

  const onSubmit: SubmitHandler<TodoListCreatePostModel> = async (data) => {
    try {
      await todoListAction(data);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle state chip selection
  const handleStateSelect = (state: string) => {
    setValue("state", state); // Update the form value for state
  };

  return (
    <div className="flex flex-col border rounded-lg shadow-lg p-4">
      <div className="flex gap-4 pb-4 justify-end">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          +
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  {...register("title")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <div className="flex gap-2 mt-2">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    statusOptions.map((status, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleStateSelect(status.name)}
                        className={`px-4 py-2 rounded-full text-sm ${
                          stateValue === status.name
                            ? "bg-[status.color] text-white"
                            : "bg-gray-200"
                        }`}
                        style={{
                          backgroundColor:
                            stateValue === status.name
                              ? status.color
                              : "#e0e0e0",
                        }}
                      >
                        {status.name}
                      </button>
                    ))
                  )}
                </div>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!isDirty}>
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <TodoListTable tasks={tasks} />
    </div>
  );
}
