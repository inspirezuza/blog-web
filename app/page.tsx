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
      next: { revalidate: 300 },
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
  console.log(blogs);
  return (
    <>
      <div className="container mx-auto ">
        <div>Hello Page</div>
        <div className="grid">
          {blogs.map((blog: Blog, index: number) => (
            <div key={index}>
              <div>ID: {blog.id}</div>
              <div>{blog.attributes.title}</div>
              <div>{blog.attributes.description}</div>
              <Link href={"#"}>See more</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
