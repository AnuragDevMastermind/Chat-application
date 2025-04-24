export type ActiveInboxUsers = {
  users: string[];
  active: string[];
};

export type ActiveInboxUsersMap = {
  [key: string]: ActiveInboxUsers;
};
