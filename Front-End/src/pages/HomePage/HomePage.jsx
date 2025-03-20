import { useEffect, useState } from "react";
import ButtonCategory from "../../components/ButtonCategory/ButtonCatgeory";
import Collection from "../../components/Collection/Collection";
import ProductList from "../../components/Product/ProductList";
import SlideHome from "../../components/SlideHome/SlideHome";
import Title from "../../components/Title/Title";
import { getAllProductsNew } from "../../services/productService";
import { getAllCategoriesWithProduct } from "../../services/categoryService";
const HomePage = () => {
  const [categories, setCategories] = useState(null);
  const [productNews, setProductNews] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const categoriesRes = await getAllCategoriesWithProduct();
        const products = await getAllProductsNew();
        setCategories(categoriesRes.data);
        setProductNews(products.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <SlideHome />
      <div className="mb-[50px]">
        <img
          src="newrelease.png"
          alt=""
          className="w-full h-[150px] object-cover"
        />
      </div>
      {productNews && (
        <div>
          <ProductList data={productNews} />
          <ButtonCategory
            title={"Street gang collection"}
            link={`/collections`}
          />
          <div className="my-[20px] overflow-hidden">
            <img
              src="cskh.png"
              alt=""
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      )}
      {categories &&
        categories.map((item, index) => (
          <div key={index}>
            <Title
              data={{
                title: `${item.name} STREET GANG`,
                link: `/collections?category=${item.slug}`,
              }}
            />
            <ProductList data={item.products} />
            <ButtonCategory
              title={`${item.name} Street Gang`}
              link={`/collections?category=${item.slug}`}
            />
          </div>
        ))}
      <Collection />
    </>
  );
};

export default HomePage;
