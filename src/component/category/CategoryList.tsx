import React from "react";
import { GlobalContext,TValueContext } from "../../context/GlobalContextProvider";
import { CategoryCard } from "./CategoryCard";
import { Loader } from "../common/Loader";
import { Error } from "../common/Error";
import { NoData } from "../common/NoData";

import {category} from "../../context/reducer/Reducers";

export const CategoryList: React.FC = () => {
  console.log('global context: ', GlobalContext)
  const { state, loadCategories } = React.useContext<TValueContext>(GlobalContext);
  const { categoryList, loading, error } = state;


  React.useEffect(() => {
    console.log('load cat')
    loadCategories();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (categoryList.length <= 0) return <NoData />;
  return (
    <div className="row">
      {categoryList.map((category:category) => (
        <CategoryCard key={category.cid} category={category} />
      ))}
    </div>
  );
};
