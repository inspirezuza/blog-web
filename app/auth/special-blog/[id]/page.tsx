import { Image } from "@nextui-org/react";
import { cookies, headers } from "next/headers";

interface Blog {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

const fetchSpecialBlogs = async (id: number) => {
  try {
    const token = cookies().get("token");
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api/special-blogs/${id}?populate=thumbnail,author`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
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
  const blog = await fetchSpecialBlogs(params.id);
  const headerList = headers();
  const user = JSON.parse(headerList.get("users") || "[]");
  return (
    <>
      <div className="bg-slate-400 h-screen w-full">
        <div className="bg-slate-300 container mx-auto p-4">
          <div className="text-5xl font-extrabold text-center p-10 ">
            Welcome {user.email.split("@")[0]} to My Special Blog!
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
                src={`${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data[0].attributes.url}`}
                alt={blog.attributes.thumbnail.data[0].attributes.name}
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
