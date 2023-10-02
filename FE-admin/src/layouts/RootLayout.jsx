import Sidebar from "./sidebar/Sidebar";

function RootLayout({ children }) {
  return (
    <div className="fixed inset-0 flex overflow-hidden">
      <Sidebar />
      <main className="max-w-7xl flex-1 mx-auto overflow-y-auto">{children}</main>
    </div>
  );
}

export default RootLayout;
