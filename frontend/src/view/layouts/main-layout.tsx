import { Outlet } from "react-router-dom";

import { ModeToggle } from "../components/mode-toggle";
import { Sidebar } from "../components/sidebar";

export function MainLayout() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between p-4 lg:justify-end">
          <Sidebar className="flex lg:hidden" />
          <ModeToggle />
        </div>
        <div className="border-y">
          <div className="bg-background">
            <div className="lg:grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />

              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
