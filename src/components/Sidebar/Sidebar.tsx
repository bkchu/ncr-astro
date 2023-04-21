import {
  TableOfContents,
  TableOfContentsLink,
} from "@/components/TableOfContents/TableOfContents";
import { isSidebarOpen } from "@/stores/sidebar";
import tableOfContents from "@/table-of-contents.json";
import { cn } from "@/utils/cn";
import { Transition } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import { Fragment } from "react";

interface SidebarProps {
  links: {
    title: string;
    href: string;
  }[];
  slug?: string;
}

export const Sidebar = ({ links, slug }: SidebarProps) => {
  const isOpen = useStore(isSidebarOpen);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={isSidebarOpen.set}>
      <DialogPrimitive.Trigger asChild>
        <button className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 font-sans shadow-xl">
          <MenuIcon />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/20"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-25 translate-x-full"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-25 translate-x-full"
          >
            <DialogPrimitive.Content
              forceMount
              className={cn(
                "fixed z-50",
                "w-[calc(100%_-_16px)] rounded-lg md:max-w-sm",
                "bottom-2 left-2 right-2 top-2 md:left-auto",
                "bg-white shadow-2xl",
                "overflow-clip focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75"
              )}
            >
              <div className="absolute bottom-0 right-0 flex h-12 w-full items-center justify-end bg-black p-2">
                <DialogPrimitive.Close asChild>
                  <button className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 shadow-xl">
                    <XIcon />
                  </button>
                </DialogPrimitive.Close>
              </div>
              <nav className="h-[calc(100%_-_48px)] overflow-y-scroll bg-white">
                <TableOfContents
                  links={tableOfContents as TableOfContentsLink[]}
                  slug={slug}
                />
              </nav>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
