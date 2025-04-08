// import { useState } from "react";

function Categories({ value, onChangeCategory }) {
  console.log(value);
  // const [activeIndex, setActiveIndex] = useState(5);

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
