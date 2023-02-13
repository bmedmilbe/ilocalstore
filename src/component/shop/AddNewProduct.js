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

const AddNewProduct = ({ product }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState(0);
  const {
    state: {},
  } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }
    setLoading(true);

    // notifySuccess('For demo this feature is disable!');

    // "id", "product", "price", "description", 'slug',
    //"id", "name", "collection", "description", 'tag', 'image', 'slug'
    // console.log(data);
    const collectionData = {};
    if (data.collection === "0" || data.newcollection !== "") {
      if (data.newcollection) {
        let collection = collections.find(
          (collection, i) => collection.title === data.newcollection
        );
        if (!collection) {
          CollectionServices.saveCollection({
            title: data.newcollection,
            slug: data.newcollection
              .toLowerCase()
              .replace("&", "")
              .split(" ")
              .join("-"),
          })
            .then((res) => {
              collectionData.collection = res.id;
              // console.log(collectionData);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              notifyError(err ? err?.response?.data?.details : err.message);
            });
        } else {
          // setCollection(collection.id);
          collectionData.collection = collection.id;
        }
      } else {
        notifyError("You have to insert or choose a collection");
      }
    } else {
      collectionData.collection = data.collection;
    }

    // console.log(collectionData);

    const productData = {
      collection:
        data.collection !== 0 ? data.collection : collectionData.collection,
      name: data.name,

      description: data.description,
      tag: data.tag,
      image: imageUrl,
      slug: data.name.toLowerCase().replace("&", "").split(" ").join("-"),
    };

    ProductServices.saveProduct(productData)
      .then((res) => {
        if (res) {
          res.price = data.price;
          res.product = res.id;
          res.id = null;
          // console.log(res);
          ShopServices.saveShopProduct(data.store, res)
            .then((res) => {
              if (res) {
                setLoading(false);
                notifySuccess("Product Successfully Added!");
                Cookies.set("product", JSON.stringify(res));
              }
            })
            .catch((err) => {
              setLoading(false);
              notifyError(err ? err?.response?.data?.details : err.message);
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err?.response?.data?.details : err.message);
      });
  };

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("store", product.store);
      setValue("collection", product.collection);
      setValue("newcollection", product.newcollection);
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
                        {console.log(collections)}
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
                        <NoInputArea
                          register={register}
                          label="New Collection"
                          name="newcollection"
                          type="text"
                          placeholder="Smarth Phones"
                        />
                        <Error errorName={errors.newcollection} />
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
                        disabled={loading}
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
