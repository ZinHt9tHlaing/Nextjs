export default function notFoundPage() {
    return (
      <section>
        <div className=" text-center mt-56">
          <h1 className=" text-8xl font-bold text-gray-800">404</h1>
          <p className=" font-bold text-gray-800 text-2xl my-3">
            Not Found <span className=" font-extrabold text-red-600">!</span>
          </p>
          <p className=" text-gray-500 text-sm font-semibold">
            No post with this <span className=" font-extrabold text-gray-700">ID.</span>
          </p>
        </div>
      </section>
    );
  }