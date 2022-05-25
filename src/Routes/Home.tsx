import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  getPopular,
  getTopRated,
  getUpcoming,
  IGetMoviesResult,
  IGetPopular,
  IGetTopRated,
  IGetUpcoming,
} from "./api";
import MovieSlider from "./MovieSlider";
import { makeImagePath } from "./utilities";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

function Home() {
  const { isLoading: nowLoading, data: nowData } = useQuery<IGetMoviesResult>(
    ["movies", "nowplaying"],
    getMovies
  );
  const { isLoading: topRatedLoading, data: topRatedData } =
    useQuery<IGetTopRated>(["movies", "topRated"], getTopRated);

  const { isLoading: upcomingLoading, data: upComingData } =
    useQuery<IGetUpcoming>(["movies", "upcoming"], getUpcoming);

  const { isLoading: popularLoading, data: popularData } =
    useQuery<IGetPopular>(["movies", "popular"], getPopular);

  return (
    <Wrapper>
      {nowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>

          <MovieSlider
            loading={nowLoading}
            data={nowData}
            title="Now Playing"
          />
          <MovieSlider
            loading={topRatedLoading}
            data={topRatedData}
            title="Top Rated"
          />
          <MovieSlider
            loading={upcomingLoading}
            data={upComingData}
            title="Upcoming"
          />
          <MovieSlider
            loading={popularLoading}
            data={popularData}
            title="Popular"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
