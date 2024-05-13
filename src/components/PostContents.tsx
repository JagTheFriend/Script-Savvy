function Post() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-5 max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            href="#"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PostContents() {
  return (
    <section className="mt-4 grid auto-cols-max grid-flow-row">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  );
}
