import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useContext, useEffect, useState } from "react";

//internal import
import Layout from "@layout/Layout";
import Tags from "@component/common/Tags";
import Stock from "@component/common/Stock";
import Price from "@component/common/Price";
import Card from "@component/slug-card/Card";
import useAddToCart from "@hooks/useAddToCart";
import Discount from "@component/common/Discount";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";

const ProductScreen = ({ product, relatedProduct }) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { handleAddItem, setItem, item } = useAddToCart();
  const [mainImage, setMainImage] = useState(
    product?.product.images ? product.product.images[0].image : ""
  );
  useEffect(() => {
    setIsLoading(false);
  }, [product]);

  const handleChangeImage = (src) => {
    setMainImage(src);
    // document.getElementById("main-image").src = src;
  };

  //comment this when using getServerSideProps
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // console.log(product);
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout title={product?.title} description={product?.description}>
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />
                    {""}
                  </li>
                  <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                    <Link href="/">
                      <a>Products</a>
                    </Link>
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
                    {/* {console.log(product)} */}
                    {/* <Link
                      href={`/search?category=${product.sub_category
                        .toLowerCase()
                        .replace("&", "")
                        .split(" ")
                        .join("-")}`}
                    >
                      <a>{product.children}</a>
                    </Link> */}
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm px-1 transition duration-200 ease-in ">
                    {product?.product.name}
                  </li>
                </ol>
              </div>
              {product ? (
                <div className="w-full rounded-lg p-3 lg:p-12 bg-white">
                  <div className="flex flex-col xl:flex-row">
                    <div className="flex-shrink-0 xl:pr-10 lg:block w-full mx-auto md:w-6/12 lg:w-5/12 xl:w-4/12 relative">
                      <Discount product={product} slug={true} />
                      <Image
                        src={mainImage}
                        alt={product.product.title}
                        // layout="responsive"
                        width={650}
                        height={650}
                        priority
                      ></Image>
                      <div className="absolute rounded z-21 left-2 top-8 w-12">
                        {product.product.images.map((image) => (
                          <div
                            key={image.id}
                            className="rounded-2xl cursor-pointer shadow-md m-1 w-full max-w-4xl"
                            onClick={() => handleChangeImage(image.image)}
                          >
                            <Image
                              className="rounded-2xl"
                              src={image.image}
                              width={80}
                              height={80}
                              alt={product.product.name}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                        <div className="w-full md:w-7/12 md:pr-4 lg:pr-4 xl:pr-12">
                          <div className="mb-6">
                            <h1 className="leading-7 text-lg md:text-xl lg:text-2xl mb-1 font-semibold font-serif text-gray-800">
                              {product.product.name}
                            </h1>
                            <p className="uppercase font-serif font-medium text-gray-500 text-sm">
                              SKU :{" "}
                              <span className="font-bold text-gray-600">
                                {product.sku ? product.sku : 10} {/*//Stock */}
                                {/* : product._id.substring(18, 24)} */}
                              </span>
                            </p>
                          </div>
                          <Price product={product} />
                          <div className="mb-4 md:mb-5 block">
                            <Stock product={product} />
                          </div>
                          <div>
                            <p className="text-sm leading-6 text-gray-500 md:leading-7">
                              {product.product.description
                                ? product.product.description
                                : product.description}
                            </p>

                            <div className="flex items-center mt-4">
                              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                                <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                                  <button
                                    onClick={() => setItem(item - 1)}
                                    disabled={item === 1}
                                    className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                                  >
                                    <span className="text-dark text-base">
                                      <FiMinus />
                                    </span>
                                  </button>
                                  <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                                    {item}
                                  </p>
                                  <button
                                    onClick={() => setItem(item + 1)}
                                    disabled={
                                      product.quantity < item ||
                                      product.quantity === item
                                    }
                                    className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                                  >
                                    <span className="text-dark text-base">
                                      <FiPlus />
                                    </span>
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleAddItem(product)}
                                  disabled={product.quantity < 1}
                                  className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                                >
                                  Add To Cart
                                </button>
                              </div>
                            </div>

                            {/* <button
                      onClick={() => handleAddItem(product)}
                      className="leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-6 hover:text-white hover:bg-emerald-600 h-12 text-sm lg:text-base w-full sm:w-auto"
                    >
                      Add to Cart
                    </button> */}

                            <div className="flex flex-col mt-4">
                              <span className="font-serif font-semibold py-1 text-sm d-block">
                                <span className="text-gray-700">
                                  <h3 className="text-base font-semibold mb-1 font-serif">
                                    {product.product.collection.title}
                                  </h3>
                                </span>{" "}
                                <span className="text-gray-500">
                                  {product.product.sub_collection.title}
                                </span>
                              </span>
                              <Tags product={product} />
                            </div>

                            {/* social share */}
                            <div className="mt-8">
                              <h3 className="text-base font-semibold mb-1 font-serif">
                                Share your social network
                              </h3>
                              <p className="font-sans text-sm text-gray-500">
                                For get lots of traffic from social network
                                share this product
                              </p>
                              <ul className="flex mt-4">
                                <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                  <FacebookShareButton
                                    url={`https://www.ilocalstore.com/product/${router.query.slug}`}
                                    quote="iLocalStore"
                                  >
                                    <FacebookIcon size={32} round />
                                  </FacebookShareButton>
                                </li>
                                <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                  <TwitterShareButton
                                    url={`https://www.ilocalstore.com/product/${router.query.slug}`}
                                    quote="iLocalStore"
                                  >
                                    <TwitterIcon size={32} round />
                                  </TwitterShareButton>
                                </li>
                                <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                  <RedditShareButton
                                    url={`https://www.ilocalstore.com/product/${router.query.slug}`}
                                    quote="iLocalStore"
                                  >
                                    <RedditIcon size={32} round />
                                  </RedditShareButton>
                                </li>
                                <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                  <WhatsappShareButton
                                    url={`https://www.ilocalstore.com/product/${router.query.slug}`}
                                    quote="iLocalStore"
                                  >
                                    <WhatsappIcon size={32} round />
                                  </WhatsappShareButton>
                                </li>
                                <li className="flex items-center text-center border border-gray-100 rounded-full hover:bg-emerald-500  mr-2 transition ease-in-out duration-500">
                                  <LinkedinShareButton
                                    url={`https://www.ilocalstore.com/product/${router.query.slug}`}
                                    quote="iLocalStore"
                                  >
                                    <LinkedinIcon size={32} round />
                                  </LinkedinShareButton>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="w-full xl:w-5/12 lg:w-6/12 md:w-5/12">
                          <div className="mt-6 md:mt-0 lg:mt-0 bg-gray-50 border border-gray-100 p-4 lg:p-8 rounded-lg">
                            <Card product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center align-middle mx-auto p-5 my-5">
                  <Image
                    className="my-4"
                    src="/no-result.svg"
                    alt="no-result"
                    width={400}
                    height={380}
                  />
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                    Sorry, we can not find this product 😞
                  </h2>
                </div>
              )}

              {/* related products */}
              <div className="pt-10 lg:pt-20 lg:pb-10">
                <h3 className="leading-7 text-lg lg:text-xl mb-3 font-semibold font-serif hover:text-gray-600">
                  Related Products
                </h3>
                <div className="flex">
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {relatedProduct
                        ? relatedProduct
                            ?.slice(0, 13)
                            .map((product, i) => (
                              <ProductCard key={i + 1} product={product} />
                            ))
                        : "No related product yet!"}
                      {}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

//you can use getServerSideProps alternative for getStaticProps and getStaticPaths

// export const getServerSideProps = async (context) => {
//   const { slug } = context.params;
//   const products = await ProductServices.getShowingProducts();
//   const product = await ProductServices.getProductBySlug(slug);

//   let relatedProduct= [];
//   if (slug) {
//     const selectProduct = products.find((product) => product.slug === slug);
//     relatedProduct = products.filter(
//       (product) => product.children === selectProduct.children
//     );
//   }

//   return {
//     props: {
//       product,
//       relatedProduct,
//     },
//   };
// };

//use getStaticPaths and getStaticProps when in production this will make faster load data

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  // const product = await ProductServices.getProductBySlug(slug);
  const products = await ProductServices.getShowingProducts();
  let productsFound = products.filter((p) => p.slug == slug);
  const product = productsFound.length > 0 ? productsFound[0] : null;

  // let product = null;
  // let products = [];

  // ProductServices.getShowingProducts()
  //   .then((res) => {
  //     products = res;

  //   })
  //   .catch((err) => {
  //     // setLoading(false);
  //     products = [];
  //   });

  // const product = await ProductServices.getProductBySlug(slug);

  let relatedProduct = [];
  if (slug && product) {
    const selectProduct = product;

    relatedProduct = products.filter(
      (product) =>
        product.product.sub_collection.slug ==
          selectProduct.product.sub_collection.slug &&
        product.id !== selectProduct.id
    );
  }

  return {
    props: {
      product,
      relatedProduct,
    },
    revalidate: 20,
  };
};

export const getStaticPaths = async () => {
  // const products = await ProductServices.getShowingProducts();
  const products = await ProductServices.getShowingProducts();

  const paths = products.map((product) => ({
    params: { slug: `${product.slug ? product.slug.toString() : "1-1"}` + "" },
  }));

  return { paths, fallback: true };
};

export default ProductScreen;
