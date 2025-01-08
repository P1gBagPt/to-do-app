// components/TodoListTable.tsx

import { TodoListGetModel } from "@/types/todolist";

interface TodoListTableProps {
  tasks: TodoListGetModel[];
}

export default function TodoListTable({ tasks }: TodoListTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b-2">
            <th className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
            <th className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-4 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-2 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-b-2">
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5">{task.state}</div>
              </td>
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5">{task.title}</div>
              </td>
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5">{task.description}</div>
              </td>
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5">
                  {task.created_at.getDate()}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm leading-5">{task.state}</div>
              </td>
              <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="flex flex-col sm:flex-row sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
