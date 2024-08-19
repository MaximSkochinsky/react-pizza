import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { useEffect, useState } from "react";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

function Home() {
  //https://66b8c8013ce57325ac781dfe.mockapi.io/items
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности (по убыванию)",
    sortProperty: "rating",
    sortOrder: "desc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  const search = searchValue ? `&search=${searchValue}` : "";

  const [isLoading, setIsLoading] = useState(true);

  console.log(sortType);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://66b8c8013ce57325ac781dfe.mockapi.io/items?page=${currentPage}&limit=3&${
        categoryId > 0 ? `category=${categoryId}&` : ""
      }sortBy=${sortType.sortProperty}&order=${sortType.sortOrder}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = Array.isArray(items) ? (
    items.map((item) => <PizzaBlock key={item.id} {...item} />)
  ) : (
    <></>
  );
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
