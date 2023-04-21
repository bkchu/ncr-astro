import { isSidebarOpen } from "@/stores/sidebar";
import { cn } from "@/utils/cn";

interface TableOfContentsPage {
  type: "page";
  name: string;
  slug: string;
}

interface TableOfContentsPart {
  type: "part";
  name: string;
  pages: TableOfContentsPage[];
}

export type TableOfContentsLink = TableOfContentsPage | TableOfContentsPart;

interface TableOfContentsProps {
  links: TableOfContentsLink[];
  slug?: string;
}

// this should be a recursive component to handle the nested structure
export const TableOfContents = ({ links, slug }: TableOfContentsProps) => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.name}>
          {link.type === "page" ? (
            <button
              role="link"
              className={cn(
                "block h-full w-full cursor-pointer px-4 py-2 text-left text-lg",
                {
                  "bg-ncr-primary/50": slug && link.slug === slug,
                }
              )}
              onClick={() => {
                isSidebarOpen.set(false);

                setTimeout(() => {
                  window.location.href = `/page/${link.slug}`;
                }, 300);
              }}
            >
              {link.name}
            </button>
          ) : (
            <>
              <div className="block h-full w-full select-none bg-gray-100 px-4 py-2 text-left font-sans text-sm font-bold uppercase tracking-wider text-gray-500">
                {link.name}
              </div>
              <TableOfContents links={link.pages} slug={slug} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
