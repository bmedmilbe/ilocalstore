import useSessionstorage from "@rooks/use-sessionstorage";
import { SidebarContext } from "@context/SidebarContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

//internal import
import Layout from "@layout/Layout";
import Banner from "@component/banner/Banner";
import CardTwo from "@component/cta-card/CardTwo";
import OfferCard from "@component/offer/OfferCard";
import StickyCart from "@component/cart/StickyCart";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import MainCarousel from "@component/carousel/MainCarousel";
import FeatureCategory from "@component/category/FeatureCategory";
import Loading from "@component/preloader/Loading";
import CategoryCarousel from "@component/carousel/CategoryCarousel";
import ShopCarousel from "@component/carousel/ShopCarousel";
import FeatureCollection from "@component/collection/FeatureCollection";
import CardShop from "@component/shop-card/CardShop";
import ShopServices from "@services/ShopService";
import StickyCategory from "@component/collection/StickyCategory";
import SubCollectionServices from "../services/SubCollectionServices";
import SubCollectionCard from "../component/collection/SubCollectionCard";

const Home = ({
  products,
  stores,
  popularProducts,
  discountProducts,
  subCollections,
}) => {
  const router = useRouter();

  const [value, set] = useSessionstorage("products", products);
  const { isLoading, setIsLoading } = useContext(SidebarContext);

  useEffect(async () => {
    if (router.asPath === "/") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const storeStep = 3;
  const itemStep = 1000;
  let storeNumber = 0;
  let itemNumber = 0;

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={"Receive in same day"}
          description={"Buy now and receive same day in Luton Area"}
        >
          <div className="min-h-screen">
            <StickyCart />
            <StickyCategory />
            <CategoryCarousel />
            {/* <div>hgkf kgvkg</div> */}
            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
              <br />
              {/* feature category's */}
              {/* <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  class="w-full"
                  src="https://res.cloudinary.com/devqsmv1s/image/upload/v1679058106/ilocalstore/products/o1j73mj6gut8fba2biqv.png"
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #photography
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #travel
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #winter
                  </span>
                </div>
              </div> */}
              {/* <div className="sm:px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                {products
                  ?.slice(itemNumber, itemNumber + itemStep)
                  .map((product) => {
                    itemNumber++;
                    return <ProductCard key={product.id} product={product} />;
                  })}
              </div> */}

              {/* <div className="mx-auto max-w-screen-2xl px-3 sm:px-10"> */}

              {/* <div className="max-w-screen-2xl flex py-10 lg:py-12">
                <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
                  <CardShop shops={stores} />
                  // {/* // {(storeNumber += storeStep)}  */}
              {/* </div>
              </div> */}
              {/* {console.log(subCollections)} */}
              <div className="max-w-screen-2xl flex py-10 lg:py-12">
                <div className="w-full grid grid-col gap-4 grid-cols-1 2xl:gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
                  <SubCollectionCard subCollections={subCollections} />
                  {/* // {(storeNumber += storeStep)}  */}
                </div>
              </div>
            </div>
            {/* popular products */}
            {/* <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3"></div>
            </div> */}
            {/* <div className="bg-gray-100 lg:py-16 py-10">
              <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                <FeatureCollection />
              </div>
            </div> */}
            {/* promotional banner card
            <div className="block mx-auto max-w-screen-2xl">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
                <div className="lg:p-16 p-6 bg-emerald-500 shadow-sm border rounded-lg">
                  <CardTwo />
                </div>
              </div>
            </div> */}
            {/* discounted products */}
            {/* <div
              id="discount"
              className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10"
            >
              <div className="mb-10 flex justify-center">
                <div className="text-center w-full lg:w-2/5">
                  <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                    Latest Discounted Products
                  </h2>
                  <p className="text-base font-sans text-gray-600 leading-6">
                    See Our latest discounted products below. Choose your daily
                    needs from here and get a special discount with free
                    shipping.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                    {discountProducts?.slice(0, 18).map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Layout>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const products = await ProductServices.getShowingProducts();
  const stores = await ShopServices.getShops();
  const subCollections = await SubCollectionServices.getShowingSubCollection();

  // const stores = [];

  const popularProducts = products;
  // const popularProducts = products.filter((p) => p.discount === 0);
  const discountProducts = products;
  // const user = UserServices.getJWT();
  // const user = UserServices.getJWT()
  //   ? await UserServices.getCurrentUser()
  //   : null;

  // console.log(UserServices.getJWT());

  return {
    props: {
      products,
      stores,
      subCollections,
    },
    revalidate: 60,
  };
};

// export const getServerSideProps = async () => {
//   const products = await ProductServices.getShowingProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Home;
