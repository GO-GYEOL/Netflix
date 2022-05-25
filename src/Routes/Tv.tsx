import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IGetOnTheAirTV,
  getOnTheAirTV,
  getTopRatedTV,
  getPopularTV,
  IGetPopularTV,
  IGetTopRatedTV,
} from "./api";
import TVSlider from "./TVSlider";
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

function Tv() {
  const { isLoading: OnTheAirLoading, data: OnTheAirTvShow } =
    useQuery<IGetOnTheAirTV>(["TV", "onTheAir"], getOnTheAirTV);

  const { isLoading: getTopRatedLoading, data: getTopRatedTvShow } =
    useQuery<IGetTopRatedTV>(["TV", "toprated"], getTopRatedTV);

  const { isLoading: getPopularLoading, data: getPopularTvShow } =
    useQuery<IGetPopularTV>(["TV", "popular"], getPopularTV);

  return (
    <Wrapper>
      {OnTheAirLoading &&  getTopRatedLoading && getPopularLoading? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              OnTheAirTvShow?.results[0].backdrop_path + ""
            )}
          >
            <Title>{OnTheAirTvShow?.results[0].name}</Title>
            <Overview>{OnTheAirTvShow?.results[0].overview}</Overview>
          </Banner>
          <TVSlider
            loading={OnTheAirLoading}
            data={OnTheAirTvShow}
            title="Now Playing"
          />
          <TVSlider
            loading={getTopRatedLoading}
            data={getTopRatedTvShow}
            title="Top Rated"
          />
          <TVSlider
            loading={getPopularLoading}
            data={getPopularTvShow}
            title="Popular"
          />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
