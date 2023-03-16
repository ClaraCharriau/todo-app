type CategoryType = "shopping" | "health" | "work" | "bills" | "cleaning" | "other";

export interface Task {
    id: number;
    content: string;
    category: CategoryType;
    isUrgent: boolean;
    doneDate: Date | null;
}