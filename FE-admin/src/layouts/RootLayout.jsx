import Sidebar from "./sidebar/Sidebar";

function RootLayout({ children }) {
  return (
    <div className="fixed inset-0 flex overflow-hidden">
      <Sidebar />
      <main className="w-full flex-1 mx-auto overflow-y-auto p-5 bg-zinc-200 overflow-y-auto">{children}</main>
    </div>
  );
}

export default RootLayout;
