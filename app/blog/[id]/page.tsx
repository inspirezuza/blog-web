import { Image } from "@nextui-org/react";

interface Blog {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

const fetchBlogs = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate=thumbnail,author`,
      {
        next: { revalidate: 300 }, // 5 minute revalidate
      }
    );
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

export default async function Page({ params }: { params: { id: number } }) {
  const blog = await fetchBlogs(params.id);
  console.log(blog.attributes.thumbnail.data.attributes.width);
  return (
    <>
      <div className="bg-slate-400 h-screen w-full">
        <div className="bg-slate-300 container mx-auto p-4">
          <div className="text-5xl font-extrabold text-center p-10 ">
            My Blog
          </div>
          <div className="px-10 py-5 mx-10">
            <div>ID: {blog.id}</div>
            <div className="text-4xl font-extrabold pb-1">
              {blog.attributes.title}
            </div>
            <div className="py-4">
              <Image
                height={400}
                width={400}
                src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.url}`}
                alt={blog.attributes.thumbnail.data.attributes.name}
              />
            </div>
            <div>{blog.attributes.description}</div>
            <div className="py-4 ">
              <span className="text-medium font-bold"> Author by : </span>{" "}
              {blog.attributes.author.data.attributes.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
