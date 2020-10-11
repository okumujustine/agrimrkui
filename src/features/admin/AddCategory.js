import * as React from "react";
import axios from "axios";
import { appTokenConfig } from "../../redux/actions/auth/authActions";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import GetProductCategories from "./GetProductCategories";

export default function AddCategory() {
  const [category, setCategory] = React.useState("");
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

  const onCategorySubmit = async (event) => {
    event.preventDefault();
    const loggedInToken = await getLoggedInToken();
    axios
      .post(
        "http://127.0.0.1:5000/product/addcategory",
        { category },
        appTokenConfig(loggedInToken)
      )
      .then((addedCategoryResponse) => {
        console.log("reaching here");
        setCategories([
          ...categories,
          {
            id: category.length + 1,
            name: addedCategoryResponse.data.data.name,
          },
        ]);
      })
      .catch((error) => {
        console.log("failed , try again later");
      });
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={onCategorySubmit}>
        <input
          placeholder="category ..."
          type="text"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      <GetProductCategories categories={categories} />
    </div>
  );
}