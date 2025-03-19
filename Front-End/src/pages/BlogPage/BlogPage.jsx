import { useState, useEffect } from "react";
import { Breadcrumb, Menu } from "antd";
import { Link } from "react-router";
import { getBlogs } from "../../services/blogService";
import "./BlogPage.scss";

const menuLink = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "SALE",
    link: "/sale",
  },
  {
    title: "Sản phẩm",
    link: "/collections",
  },
  {
    title: "Bài viết",
  },
  {
    title: "Liên hệ",
    link: "/contact",
  },
];

const categories = [
  "NEW COLLECTION",
  "JACKET",
  "HOODIE",
  "ÁO THUN",
  "QUẦN",
  "PHỤ KIỆN",
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="blog_page">
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: "Tin tức",
          },
        ]}
        style={{ paddingTop: "8px" }}
      />
      <img style={{ marginTop: "10px" }} src="/blog-banner.png" alt="banner" />

      <main>
        <section>
          <div className="section_content">
            <h1>Tin tức</h1>
            <div className="blog_list">
              {blogs.map((blog) => (
                <article key={blog.id}>
                  <div className="blog_thumb">
                    <img src={blog.thumbnail} alt={blog.title} />
                  </div>
                  <div className="blog_content">
                    <h2>{blog.title}</h2>
                    <p className="blog_description">
                      {blog.content.length > 151
                        ? blog.content.substring(0, 151) + "..."
                        : blog.content}
                    </p>
                    <div className="blog_footer">
                      bởi: {blog.author} • {formatDate(blog.date)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <aside>
          <div className="aside_item">
            <h3>Bài viết mới nhất</h3>
            <div className="blog_list">
              {blogs.slice(0, 3).map((blog) => (
                <div className="blog_item" key={blog.id}>
                  <div className="blog_thumb">
                    <img src={blog.thumbnail} alt={blog.title} />
                  </div>
                  <div className="blog_content">
                    <h4>{blog.title}</h4>
                    <div className="blog_footer">Tin tức</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aside_item">
            <h3>Danh mục bài viết</h3>
            <Menu mode="inline" selectedKeys={[]}>
              {menuLink.map((item, index) => (
                <>
                  {item.title !== "Sản phẩm" ? (
                    <Menu.Item
                      key={index}
                      onClick={() =>
                        item.title === "Blog" && window.location.reload()
                      }
                    >
                      <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                  ) : (
                    <Menu.SubMenu key={index} title={item.title}>
                      {categories.map((category, idx) => (
                        <Menu.Item key={idx}>
                          <Link
                            to={`/collections?category=${
                              category === "NEW COLLECTION"
                                ? "bo-suu-tap-moi"
                                : category
                            }`}
                          >
                            {category}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  )}
                </>
              ))}
            </Menu>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPage;
