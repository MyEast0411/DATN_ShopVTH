import Sidebar from "./sidebar/Sidebar";

function RootLayout({ children }) {
  return (
    <div className="fixed inset-0 flex overflow-hidden">
      <Sidebar />
      <main
        className="w-full flex-1 mx-auto p-5 overflow-y-auto"
        style={{
          backgroundColor: "white",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
