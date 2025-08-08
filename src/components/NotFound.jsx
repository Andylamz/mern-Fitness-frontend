import Header from "./Header";

function NotFound() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-5 items-center justify-center mt-40 ">
        <p className="text-xl">Something Went Wrong....</p>
        <p className="text-xl">404 Not Found</p>
      </div>
    </div>
  );
}

export default NotFound;
