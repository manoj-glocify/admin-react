export const checkPermission = (module: string, action: string): boolean => {
  const permissions = localStorage.getItem("user_permission");
  if (!permissions) return false;
  const permissionArray = JSON.parse(permissions || "[]");
  const permission = permissionArray.find(
    (perm: any) => perm.module === module
  );
  return permission && permission.actions.includes(action);
};
