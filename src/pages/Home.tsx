import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

// import qs from "qs";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import { setCategoryId, setCurrentPage } from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizza/asyncActions";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isMounted = useRef(false);

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

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
