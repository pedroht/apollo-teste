import { cn } from "@/app/lib/utils";
import { Layers3, PlusCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  className: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("lg:pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Apollo
          </h2>
          <div className="flex space-y-1 lg:flex-col">
            <Link
              to="/products"
              className="ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              List Products
            </Link>

            <Link
              to="/products/new"
              className="ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a product
            </Link>

            <Link
              to="/categories"
              className="ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Layers3 className="mr-2 h-4 w-4" />
              List Categories
            </Link>

            <Link
              to="/categories/new"
              className="ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
