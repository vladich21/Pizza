import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/pizzaSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue;

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  //   // const params = qs.parse(
  //   //   window.location.search.substring(1)
  //   // ) as unknown as SearchPizzaParams;
  //   // const sortObj = list.find((obj) => obj.sortProperty === params.sortBy);
  //   // dispatch(
  //   //   setFilters({
  //   //     searchValue: params.search,
  //   //     categoryId: Number(params.category),
  //   //     currentPage: Number(params.currentPage),
  //   //     sort: sortObj || list[0],
  //   //   })
  //   // );
  //   getPizzas();

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       })
  //     );
  //     isMounted.current = true;
  //   }
  // });

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={(i: any) => onChangeCategory(i)}
          />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>Не удалось загрузить пиццы. Повторите попытку позже.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeleton : pizzas}
          </div>
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
