import { useState, useEffect } from "react";
import { Breadcrumb, Menu } from "antd";
import { getBlogs } from "../../services/blogService";
import { getAllCategories } from "../../services/categoryService";
import "./BlogPage.scss";
import { Link, useNavigate, useLocation } from "react-router";
import { Pagination } from "antd";

const menuLink = [
  { title: "Trang chủ", link: "/" },
  { title: "Thành viên", link: "/member" },
  { title: "Sản phẩm", link: "/collections" },
  { title: "Bài viết", link: "/blog" },
  { title: "Liên hệ", link: "/contact" },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchApi = async () => {
      const page = location.search.split("=")[1];
      try {
        const response = await getBlogs(page);
        setBlogs(response.data);
        const cateRes = await getAllCategories();
        setCategories(cateRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [location.search]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const menuItems = menuLink.map((item, index) => {
    if (item.title === "Sản phẩm") {
      return {
        key: `submenu-${index}`,
        label: item.title,
        children: categories.map((cate, idx) => ({
          key: `cate-${idx}`,
          label: (
            <Link to={`/collections?category=${cate.slug}`}>
              {cate.name.toUpperCase()}
            </Link>
          ),
        })),
      };
    }
    return {
      key: `menu-${index}`,
      label: <Link to={item.link}>{item.title}</Link>,
    };
  });

  const handleChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    const url = `${pathName}?${searchParams.toString()}`;
    navigate(url);
  };
  return (
    <div className="blog_page">
      <Breadcrumb
        items={[{ title: <Link to="/">Trang chủ</Link> }, { title: "Tin tức" }]}
        style={{ paddingTop: "8px" }}
      />
      <img style={{ marginTop: "10px" }} src="banner.jpg" alt="banner" />

      <main>
        <section>
          <div className="section_content">
            <h1>Tin tức</h1>
            <div className="blog_list">
              {blogs &&
                blogs.result.map((blog) => (
                  <article key={`${blog._id}1`}>
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
            {blogs && blogs.totalItem > 0 && (
              <Pagination
                align="center"
                current={currentPage}
                defaultCurrent={1}
                total={blogs.totalItem}
                showSizeChanger={false}
                pageSize={2}
                style={{
                  marginTop: 20,
                }}
                onChange={handleChange}
              />
            )}
          </div>
        </section>
        <aside>
          <div className="aside_item">
            <h3>Bài viết mới nhất</h3>
            <div className="blog_list">
              {blogs &&
                blogs.result.map((blog) => (
                  <div className="blog_item" key={`${blog._id}2`}>
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
            <Menu mode="inline" selectedKeys={[]} items={menuItems} />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPage;
