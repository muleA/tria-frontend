export interface Task {
    id?: string;
    taskname: string;
    description: string;
    basline?: string;
    metric?: string;
    requireUserInput?: string;
    taskGroupID?: string;
    taskAssignmentOption?: string;
    isPullable?: string;
    taskHandlerType: string;
    isInWorkFlow?: boolean;
    stage?: number;
    serviceDetailId?: string | null;
    createdBy?: string | null;
    updatedAt?: string;
    updatedBy?: string | null;
    deletedAt?: string | null;
    deletedBy?: string | null;
  }