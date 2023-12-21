import axios from "axios";
import Link from "next/link";

const fetchBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/blogs`
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchBlogs();
  //   console.log(blogs);
  return (
    <div>
      Home page (Update new)
      {blogs.map((blog: any, index: any) => (
        <div className="flex gap-2" key={index}>
          <div>ID: {blog.id}</div>
          <div>{blog.attributes.title}</div>
          <div>{blog.attributes.description}</div>
          <div>
            <Link href={`blog/${blog.id}`}>Read more...</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
