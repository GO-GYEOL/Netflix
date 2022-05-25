import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchSearchMovie,
  fetchSearchTv,
  IGetMoviesResult,
  IGetOnTheAirTV,
} from "./api";
import MovieSlider from "./MovieSlider";
import TVSlider from "./TVSlider";
import { makeImagePath } from "./utilities";

const HeaderBox = styled.div`
  padding: 20px 60px;
`;
const SearchResults = styled.section`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  grid-column: 1 / -1;
`;
const NoResults = styled.div`
  margin-top: 70px;
  padding: 100px;
  display: flex;
  justify-content: center;
`;

interface iResultsData {
  backdrop_path: string;
  id: number;
  name?: string;
  title?: string;
  overview: string;
  poster_path: string;
}

export interface iSearchResults {
  results: iResultsData[];
}

interface RouteParams {
  keyword: string;
}

function Search() {
  const { keyword } = useParams<RouteParams>();

  const { isLoading: isMovieResultLoading, data: movieResultData } =
    useQuery<IGetMoviesResult>([keyword, "movieSearch"], () =>
      fetchSearchMovie(keyword)
    );
  const { isLoading: isTvResultLoading, data: tvResultData } =
    useQuery<IGetOnTheAirTV>([keyword, "tvSearch"], () =>
      fetchSearchTv(keyword + "")
    );

  return (
    <>
      <HeaderBox />
      {movieResultData?.total_results === 0 ? (
        <NoResults>검색 결과가 없습니다</NoResults>
      ) : (
        <SearchResults>
          {isMovieResultLoading || isTvResultLoading ? (
            <Loader>검색 중입니다...</Loader>
          ) : (
            <>
              {movieResultData?.total_results !== 0 && (
                <MovieSlider
                  keyword={keyword + ""}
                  loading={isMovieResultLoading}
                  data={movieResultData}
                  title="Movie Results"
                />
              )}
              {tvResultData?.total_results !== 0 && (
                <TVSlider
                  keyword={keyword + ""}
                  loading={isTvResultLoading}
                  data={tvResultData}
                  title="TV Results"
                />
              )}
            </>
          )}
        </SearchResults>
      )}
    </>
  );
}
export default Search;
