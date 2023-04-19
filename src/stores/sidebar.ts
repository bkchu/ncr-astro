import { atom } from "nanostores";

const isSidebarOpen = atom(false);

const openSidebar = () => isSidebarOpen.set(true);
const closeSidebar = () => isSidebarOpen.set(false);

export { isSidebarOpen, openSidebar, closeSidebar };
