import "./App.css";
import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination"
import queryString from 'query-string';
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";

function App() {

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });

  useEffect(() => {

    async function fetchPostList() {
      try {

        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message)
      }
    }

    fetchPostList();
  }, [filters])

  function handleFiltersChange(newFilters) {
    console.log('New filters: ', newFilters)
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }
  return (
    <div className="App">
      <Clock />
      <PostFiltersForm onSubmit={handleFiltersChange}></PostFiltersForm>

      <PostList posts={postList}></PostList>

      <Pagination pagination={pagination}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );

  function handlePageChange(newPage) {
    console.log('New page: ', newPage)
    setFilters({
      ...filters,
      _page: newPage,
    })
  }
}



export default App;
