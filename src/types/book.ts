export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  cover: string;
  description: string;
  type: "physical" | "ebook";
  reservedBy?: string | null;
}

export interface User {
  username: string;
  fullName: string;
  email: string;
  department: string;
  memberSince: string;
  avatar: string;
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
}

export type Toast = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}
