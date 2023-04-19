import { isSidebarOpen } from "@/stores/sidebar";
import { cn } from "@/utils/cn";
import { Transition } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Fragment } from "react";
import path from "path";

interface SidebarProps {
  links: {
    title: string;
    href: string;
  }[];
  slug?: string;
}

export const Sidebar = ({ links, slug }: SidebarProps) => {
  // const isOpen = true;
  const isOpen = useStore(isSidebarOpen);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={isSidebarOpen.set}>
      <DialogPrimitive.Trigger asChild>
        <button className="fixed bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 font-sans">
          <Menu />
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
              className="fixed inset-0 z-20 bg-black/50"
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
              className={clsx(
                "fixed z-50",
                "h-full w-[100vw] max-w-md md:w-full md:rounded-bl-lg md:rounded-tl-lg",
                "bottom-0 right-0 top-0",
                "bg-white",
                "overflow-clip focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75"
              )}
            >
              {/* sidebar content */}
              {/* div 48px high full width */}
              <div className="absolute bottom-0 right-0 flex h-12 w-full items-center justify-end bg-black p-2">
                <DialogPrimitive.Close asChild>
                  <button className="fixed bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <X />
                  </button>
                </DialogPrimitive.Close>
              </div>
              <nav className="h-full bg-gray-100">
                <ul>
                  {links.map((link) => (
                    <li>
                      <button
                        role="link"
                        className={cn(
                          "block h-full w-full cursor-pointer px-4 py-2 text-left",
                          {
                            "bg-ncr-primary/50":
                              slug && link.href.split("/").pop() === slug,
                          }
                        )}
                        onClick={() => {
                          isSidebarOpen.set(false);

                          setTimeout(() => {
                            window.location.href = link.href;
                          }, 300);
                        }}
                      >
                        {link.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
