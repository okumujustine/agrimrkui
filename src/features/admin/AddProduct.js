import * as React from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import axios from "axios";

import {
  appTokenImageConfig,
  appTokenConfig,
} from "../../redux/actions/auth/authActions";
import { getLoggedInToken } from "../../helperfuncs/getToken";

export default function AddProduct() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [imageOne, setImageOne] = React.useState("");
  const [imageTwo, setImageTwo] = React.useState("");
  const [imageThree, setImageThree] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [saleType, setSaleType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");

  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    async function getCategories() {
      const loggedInToken = await getLoggedInToken();
      if (!loggedInToken) {
        console.log("log in please!");
        return;
      }
      axios
        .get(
          "http://127.0.0.1:5000/product/category",
          appTokenConfig(loggedInToken)
        )
        .then((categoryResponse) => {
          setCategories(categoryResponse.data.categories);
        });
    }
    getCategories();
  }, []);

  const onAddProduct = async (event) => {
    event.preventDefault();
    const loggedInToken = await getLoggedInToken();

    let formData = new FormData();

    formData.append("imageOne", imageOne, imageOne.name);
    formData.append("imageTwo", imageTwo, imageTwo.name);
    formData.append("imageThree", imageThree, imageThree.name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("vendor", vendor);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("saleType", saleType);
    formData.append("category", category);
    formData.append("categoryName", categoryName);

    if (!loggedInToken) {
      confirmAlert({
        title: "Not logged in as Admin",
        message: "Log in as admin to add products",
        buttons: [
          {
            label: "Go to login",
            onClick: () => (window.location = "/login"),
          },
          {
            label: "Cancel",
          },
        ],
      });
      return;
    }

    axios
      .post(
        "http://127.0.0.1:5000/product/add",
        formData,
        appTokenImageConfig(loggedInToken)
      )
      .then((res) => {
        toast.success("Product successfully added! check shop or hire");
        setTitle("");
        setDescription("");
        setVendor("");
        setPrice("");
        setDiscount("");
        setImageOne("");
        setImageTwo("");
        setImageThree("");
        setStock("");
        setSaleType("");
        setCategory("");
      })
      .catch((error) => {
        toast.error("Failed to add blog, try again later");
      });
  };
  return (
    <div>
      <form onSubmit={onAddProduct} className="flex flex-col">
        <input
          placeholder="title ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="description ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="vendor ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          type="text"
          onChange={(e) => setVendor(e.target.value)}
        />
        <input
          placeholder="price ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="discount ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          type="number"
          onChange={(e) => setDiscount(e.target.value)}
        />
        <input
          placeholder="stock ..."
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          type="number"
          onChange={(e) => setStock(e.target.value)}
        />
        <select
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          onChange={(e) => setSaleType(e.target.value)}
        >
          <option value="" disabled defaultValue="Select sale type">
            Select sale type
          </option>
          <option value="sale">Sale</option>
          <option value="hire">Hire</option>
        </select>

        <select
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled defaultValue="Select category">
            Select category
          </option>
          {categories.map((cat, index) => (
            <option value={cat.id} key={index}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="mb-2 pl-4 py-2 border-agrisolidgreen border-2"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option value="" disabled defaultValue="Select category name">
            Select category name
          </option>
          {categories.map((cat, index) => (
            <option value={cat.name} key={index}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          className="mb-2 pl-4 py-2"
          type="file"
          name="imageone"
          onChange={(e) => setImageOne(e.target.files[0])}
        />
        <input
          className="mb-2 pl-4 py-2"
          type="file"
          name="imagetwo"
          onChange={(e) => setImageTwo(e.target.files[0])}
        />
        <input
          className="mb-2 pl-4 py-2"
          type="file"
          name="imagethree"
          onChange={(e) => setImageThree(e.target.files[0])}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
