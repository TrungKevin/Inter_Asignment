export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}

export interface TokenExchangeResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface ProfileResponse {
  profileId: number;
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
}

export interface PagedProfilesResponse {
  content: ProfileResponse[];
  totalElements: number;
  totalPages: number;
  /** Trang hiện tại (0-based, giống Spring). */
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface UserResponse {
  userId: string;
  username: string;
  email: string;
}

export interface UserClaims {
  sub: string;
  preferred_username: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: Record<string, { roles?: string[] }>;
}

export interface LoginLogResponse {
  loginId: number;
  username: string | null;
  email: string | null;
  loginTime: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface AccessRequestSubmitPayload {
  requesterUsername: string;
  reason: string;
  departmentCode: string;
  roles: string[];
  payload?: Record<string, unknown>;
}

export interface AccessRequestMineItem {
  requestId: number;
  businessKey: string;
  processInstanceId: string;
  requesterUsername: string;
  status: string;
  departmentCode: string;
  createdAt: string;
  updatedAt: string;
  /** Noi dung admin (bo sung / de xuat dieu chinh), tu API mine khi can */
  adminFeedback?: string | null;
}

export interface AccessRequestTaskItem {
  taskId: string;
  taskName: string;
  assignee: string | null;
  taskDefinitionKey: string;
  processInstanceId: string;
  businessKey: string | null;
  requesterUsername?: string | null;
  requestReason?: string | null;
  createdAt: string;
  adminComment?: string | null;
  counterProposal?: string | null;
  userClarification?: string | null;
  userClarificationAt?: string | null;
  userCounterComment?: string | null;
  userCounterCommentAt?: string | null;
}

export interface AccessRequestTaskCompletePayload {
  approved?: boolean;
  action?: 'APPROVE' | 'REJECT' | 'NEED_INFO' | 'COUNTER_PROPOSAL';
  acceptCounter?: boolean;
  comment?: string;
}
