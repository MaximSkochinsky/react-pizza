import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { useEffect, useState } from "react";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import axios from "axios";
import { setCurrentPage } from "../redux/slices/filterSlice";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Home() {
  const { categoryId, sort: sortType, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  //https://66b8c8013ce57325ac781dfe.mockapi.io/items
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности (по убыванию)",
  //   sortProperty: "rating",
  //   sortOrder: "desc",
  // });


  const search = searchValue ? `&search=${searchValue}` : "";

  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    setIsLoading(true);

    // fetch(
    //   `https://66b8c8013ce57325ac781dfe.mockapi.io/items?page=${currentPage}&limit=8&${
    //     categoryId > 0 ? `category=${categoryId}&` : ""
    //   }sortBy=${sortType.sortProperty}&order=${sortType.sortOrder}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setItems(data);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://66b8c8013ce57325ac781dfe.mockapi.io/items?page=${currentPage}&limit=6&${
          categoryId > 0 ? `category=${categoryId}&` : ""
        }sortBy=${sortType.sortProperty}&order=${sortType.sortOrder}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setItems([]);
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
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
