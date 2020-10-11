import * as React from "react";

export default function getProductCategories({ categories }) {
  return (
    <div>
      {categories.length === 0 && <p>No category exist</p>}
      {categories.map((category, index) => (
        <p className="font-bold" key={index}>
          {index + 1} - {category.name}
        </p>
      ))}
    </div>
  );
}
