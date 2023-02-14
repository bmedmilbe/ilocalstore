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
import { useContext, useEffect } from "react";

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
import ShopServices from "@services/ShopService";

const ShopScreen = ({ shop }) => {
  // const slug = params.slug;
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { handleAddItem, setItem, item } = useAddToCart();

  const { slug } = getStaticPaths();

  useEffect(() => {
    setIsLoading(false);
    {
      // console.log(shop);
    }
  }, [shop]);

  //comment this when using getServerSideProps
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={title ? title : "Shop Dashboard"}
          description={description ? description : "This is Shop Dashboard"}
        >
          <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
            <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
              <UserMenu />
              <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
                {!children && (
                  <div className="overflow-hidden">
                    <Shopmenu />
                    {console.log(shop)}
                    <AddNewShop shop={shop} />
                  </div>
                )}
                {children}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  // const product = await ProductServices.getProductBySlug(slug);
  // const products = await ProductServices.getShowingProducts();

  const [shop] = await Promise.all([ShopServices.getMyStoreBySlug(slug)]);

  return {
    props: {
      shop,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  try {
    const shops = await ShopServices.getMyShops();
    // console.log(products);
    const paths = shops.map((shop) => ({
      params: { slug: shop.slug },
    }));
    console.log(paths);
    return { paths, fallback: true };
  } catch (er) {
    console.error(er);
    return { paths: [], fallback: false }; // <- ADDED RETURN STMNT
  }
};

export default ShopScreen;
