import Link from "next/link";
import "./globals.css";
interface Blog {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${process.env.STRAPI_BASE_URL}/api/blogs`, {
      next: { revalidate: 300 }, // 5 minute revalidate
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchBlogs();
  return (
    <>
      <div className="bg-slate-400 h-screen w-full">
        <div className="bg-slate-300 container mx-auto p-4">
          <div className="text-7xl font-extrabold text-center p-10 ">
            My Blog
          </div>
          <div className="grid grid-cols-4 gap-2 p-10 mx-10">
            {blogs.map((blog: Blog, index: number) => (
              <div key={index}>
                <div>ID: {blog.id}</div>
                <div className="text-4xl font-extrabold pb-1">
                  {blog.attributes.title}
                </div>
                <div>{blog.attributes.description}</div>
                <Link href={`blog/${blog.id}`}>
                  <div className="text-blue-600 font-bold">See more</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
