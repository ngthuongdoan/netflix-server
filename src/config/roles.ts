const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};
export const roleRights = new Map(Object.entries(allRoles));
