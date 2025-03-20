import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-full pb-8 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
