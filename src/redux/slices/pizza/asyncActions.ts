import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;

    const { data } = await axios.get<PizzaItem[]>(
      `https://67f27d48ec56ec1a36d34125.mockapi.io/items/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
