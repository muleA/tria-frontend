import { List } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Menu, filterMenusByPermissions } from "../../models/menu";
import { useAuth } from "../auth/use-auth";
import SidebarItem from "./sidebar-item";

export const drawerWidth = 300;

const Sidebar = (props:{menus:Menu[]}): JSX.Element => {
  const { session } = useAuth();

  const [visibleMenu, setVisibleMenu] = useState<Menu[]>([]);

  const permittedMenu = useMemo(() => {

const userPermissions =
    session?.userInfo?.EmployeeRoles?.flatMap((role: { role: { rolePermission: any; }; }) => 
    role?.role?.rolePermission ?? []).flat().map(
        (permission: { permissionName: any; }) => permission.permissionName,
    ) ?? [];

console.log(userPermissions);

    return filterMenusByPermissions(props?.menus, userPermissions);
  }, [props?.menus, session]);

  useEffect(() => {
    setVisibleMenu(props?.menus);
  }, [permittedMenu]);

  return (
    <List dataSource={props?.menus}   >
    {props?.menus?.map((menuItem, index) => (
      <SidebarItem key={`${index}-${menuItem.name}`} menu={menuItem} mergedPath={""} />
    ))}
  </List>
  );
};

export default Sidebar;
