import { Task, TaskStatus } from "../models/task.model";

export const mockTasksData: Task[] = [
  { id: 1, title: "Update product descriptions", description: "Review and update product descriptions for the summer collection", deadline: "2023-07-15", priority: "High", status: TaskStatus.toDo },
  { id: 2, title: "Process refund requests", description: "Handle pending refund requests from the last week", deadline: "2023-07-10", priority: "Medium", status: TaskStatus.inProgress },
  { id: 3, title: "Optimize product images", description: "Compress and optimize product images for faster loading", deadline: "2023-07-20", priority: "Low", status: TaskStatus.completed },
  { id: 4, title: 'Create new product page', description: 'Design and implement a new product page layout', status: TaskStatus.toDo, deadline: '2024-12-15', priority: "Low" },
  { id: 5, title: 'Update inventory system', description: 'Integrate real-time inventory tracking', status: TaskStatus.toDo, deadline: '2024-07-15', priority: "Medium" },
  { id: 6, title: 'Optimize checkout process', description: 'Streamline the checkout flow for better conversion', status: TaskStatus.inProgress, deadline: '2024-11-15', priority: "High" },
  { id: 7, title: 'Launch email campaign', description: 'Send out newsletter to subscribers', status: TaskStatus.completed, deadline: '2024-07-15', priority: "High" },
  // Add more mock tasks here...
];