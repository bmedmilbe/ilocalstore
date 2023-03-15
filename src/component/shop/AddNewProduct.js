import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";

//internal import
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@component/form/InputArea";
import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import Uploader from "@component/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import useShopSubmit from "@hooks/useShopSubmit";
import InputAreaLock from "@component/form/InputAreaLock";
import ShopServices from "@services/ShopService";
import ProductServices from "@services/ProductServices";
import UploaderProduct from "@component/image-uploader/UploaderProduct";
import SelectedArea from "@component/form/SelectedArea";
import CollectionServices from "@services/CollectionServices";
import TextArea from "@component/form/TextArea";
import NoInputArea from "@component/form/NoInputArea";
import Collection from "@component/collection/Collection";
import SubCollectionServices from "../../services/SubCollectionServices";
import { useRouter } from "next/router";

const AddNewProduct = ({ product }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [collections, setCollections] = useState([]);
  const [subCollections, setSubCollections] = useState([]);

  // const [collection, setCollection] = useState(0);
  const {
    state: {},
  } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const saveProductShop = async (product_id, store_id, price) => {
    // console.log("aqui");
    const productShop = {
      price: price,
      slug: `${product_id}-${store_id}`,
      product: product_id,
    };
    // console.log(productShop);
    // return;

    ProductServices.getProductBySlug(productShop.slug)
      .then((res) => {
        notifyError("Error, this item is added already!");
        // router.reload(window.location.pathname);
      })
      .catch((err) => {
        ShopServices.saveShopProduct(store_id, productShop)
          .then((res) => {
            // setLoading(false);
            notifySuccess("Product successfully added!");
            Cookies.set("product", JSON.stringify(res));
            // router.reload(window.location.pathname);
          })
          .catch((err) => {
            // setLoading(false);
            notifyError(err ? err?.response?.data?.details : err.message);
          });
      });
  };

  const saveProductMain = (data) => {
    ProductServices.saveProduct(data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });
  };

  const saveProduct = async (data) => {
    // console.log(data);
    const productData = {
      collection: data.collection,
      sub_collection: data.subCollection,
      name: data.name,
      description: data.description,
      tag: data.tag,
      image: imageUrl,
      slug: data.name.toLowerCase().replace("&", "").split(" ").join("-"),
    };
    // console.log(productData.slug);
    ProductServices.getProductMainBySlug(productData.slug)
      .then((res) => {
        try {
          saveProductShop(res.id, data.store, data.price);
        } catch (ex) {
          notifyError("Error, please try again later save pS!");
        }
      })
      .catch((err) => {
        saveProductMain(productData);
        ProductServices.getProductMainBySlug(productData.slug)
          .then((res) => {
            if (res) {
              try {
                saveProductShop(res.id, data.store, data.price);
              } catch (ex) {
                notifyError("Error, please try again later save pS!");
              }
            } else {
              notifyError("Error, please try again later save pp!");
            }
          })
          .catch((err) => {
            notifyError("Error, please try again later!!");
          });
      });
  };

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    } else if (data.store == 0) {
      notifyError("Select the store!");
      return;
    } else if (data.collection == 0) {
      notifyError("Select the collecion!");
      return;
    } else if (data.subCollection == 0) {
      notifyError("Select the sub collecion!");
      return;
    }

    setLoading(true);

    saveProduct(data);

    // notifySuccess('For demo this feature is disable!');

    // "id", "product", "price", "description", 'slug',
    //"id", "name", "collection", "description", 'tag', 'image', 'slug'
    // console.log(data);

    //           saveProduct(res.id, data);

    // if (data.newcollection !== "") {
    //   let collection_temp = collections?.filter(
    //     (collection) =>
    //       (collection.slug = data.newcollection
    //         .toLowerCase()
    //         .replace("&", "")
    //         .split(" ")
    //         .join("-"))
    //   );
    //   if (!collection_temp) {
    //     CollectionServices.saveCollection({
    //       title: data.newcollection,
    //       slug: data.newcollection
    //         .toLowerCase()
    //         .replace("&", "")
    //         .split(" ")
    //         .join("-"),
    //     })
    //       .then((res) => {
    //         console.log(res);

    //         data.collection = res;
    //       })
    //       .catch((err) => {
    //         setLoading(false);
    //         notifyError(err ? err?.response?.data?.details : err.message);
    //       });
    //   } else {
    //     collection_temp = collection_temp[0];
    //     console.log(collection_temp);
    //     data.collection = collection_temp[0];
    //   }
    // }
    // console.log(data.collection);

    // if (data.newcollection !== "") {
    //   console.log(data);
    //   if (data.newcollection) {
    //     let collection = collections.find(
    //       (collection, i) => collection.title === data.newcollection
    //     );
    //     if (!collection) {
    //       CollectionServices.saveCollection({
    //         title: data.newcollection,
    //         slug: data.newcollection
    //           .toLowerCase()
    //           .replace("&", "")
    //           .split(" ")
    //           .join("-"),
    //       })
    //         .then((res) => {
    //           // collectionData.collection = res.id;
    //           saveProduct(res.id, data);
    //           // console.log(collectionData);
    //           // setLoading(false);
    //         })
    //         .catch((err) => {
    //           setLoading(false);
    //           notifyError(err ? err?.response?.data?.details : err.message);
    //         });
    //     } else {
    //       // setCollection(collection.id);
    //       // collectionData.collection = collection.id;
    //       saveProduct(collection.id, data);
    //     }
    //   } else {
    //     notifyError("You have to insert or choose a collection");
    //   }
    // } else {
    //   // collectionData.collection = data.collection;
    //   saveProduct(data.collection, data);
    // }

    // // console.log(collectionData);
  };

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("store", product.store);
      setValue("collection", product.collection);
      setValue("subCollection", product.collection);
      setValue("description", product.description);
      setValue("tag", product.tag);
      setValue("price", product.price);
      setImageUrl(product.image);
    }

    ShopServices.getMyShops()
      .then((res) => {
        setStores(
          res.map((r) => {
            r.value = r.id;
            r.name = `${r.post_code} | ${r.name}`;
            return r;
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });
    CollectionServices.getShowingCollection()
      .then((res) => {
        if (res) {
          setCollections(
            res.map((r) => {
              r.value = r.id;
              r.name = r.title;
              return r;
            })
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });

    SubCollectionServices.getShowingSubCollection()
      .then((res) => {
        // console.log(res);
        if (res) {
          setSubCollections(
            res.map((r) => {
              r.value = r.id;
              r.name = r.title;
              return r;
            })
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-serif font-semibold mb-5">
                Add New Product
              </h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="bg-white space-y-6">
              <div>
                <Label label="Photo" />
                <div className="mt-1 flex items-center">
                  <UploaderProduct
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid-cols-6 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="lg:mt-6 mt-4 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Item's title"
                          name="name"
                          type="text"
                          placeholder="Samsung 22 Ultra Brown"
                        />
                        <Error errorName={errors.name} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <SelectedArea
                          register={register}
                          defaultValue={0}
                          data={stores}
                          label="Store where customers can find the item"
                          name="store"
                          placeholder="Store name"
                        />
                        <Error errorName={errors.store} />
                      </div>
                    </div>
                    <br />
                    <div className="grid grid-cols-6 gap-8">
                      <div className="col-span-6 sm:col-span-2">
                        <InputArea
                          register={register}
                          label="Price (£)"
                          name="price"
                          type="number"
                          placeholder="1200"
                        />
                        <Error errorName={errors.price} />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        {/* {console.log(collections)} */}
                        <SelectedArea
                          defaultValue={0}
                          data={collections}
                          register={register}
                          label="Collection that this item belongs to"
                          name="collection"
                          type="text"
                        />
                        <Error errorName={errors.collection} />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        {/* {console.log(collections)} */}
                        <SelectedArea
                          defaultValue={0}
                          data={subCollections}
                          register={register}
                          label="Sub collection that this item belongs to"
                          name="subCollection"
                          type="text"
                        />
                        <Error errorName={errors.subCollection} />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <TextArea
                          register={register}
                          label="Item's description"
                          name="description"
                          placeholder="The Samsung Galaxy S22 Ultra is the headliner of the S22 series. It's the first S series phone to include Samsung's S Pen. Specifications are top-notch including 6.8-inch Dynamic AMOLED display with 120Hz refresh rate, Snapdragon 8 Gen 1 processor, 5000mAh battery, up to 12gigs of RAM, and 1TB of storage."
                        />
                        <Error errorName={errors.description} />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <NoInputArea
                          register={register}
                          label="Tag (Words about the item separated by white space)"
                          name="tag"
                          placeholder="Android Technology Smartphone Samsung"
                        />
                        <Error errorName={errors.tag} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5 text-left">
                      <button
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewProduct;
