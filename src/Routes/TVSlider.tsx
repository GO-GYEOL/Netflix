import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getDetails,
  getMovies,
  getTopRated,
  getTvDetails,
  IGetMoviesDetails,
  IGetMoviesResult,
  IGetOnTheAirTV,
  IGetTopRated,
  IGetTopRatedTV,
  IGetTvDetails,
} from "./api";
import { makeImagePath } from "./utilities";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { stringify } from "querystring";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 150px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const MoveBtn = styled(motion.div)`
  width: 25px;
  height: 150px;
  background-color: #ead4d4;
  position: absolute;
  right: 0;
  z-index: 3;
  opacity: 0.7;
  cursor: pointer;
`;

const SliderTitle = styled.div`
  position: relative;
  font-size: 25px;
  top: -110px;
`;

const Overlay = styled(motion.div)`
  z-index: 3;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 5px;
  overflow: hidden;
  z-index: 3;
`;

const BigCover = styled.div`
  width: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: absolute;
  bottom: 10px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  display: flex;
  justify-content: left;
  div {
    background-color: #c23616;
    border-radius: 5px;
    color: ${(props) => props.theme.white.darker};
    font-weight: 400;
    font-size: 13px;
    margin-right: 5px;
    margin-top: 10px;
    padding: 3px 5px;
  }
`;

const SmallDetail = styled.div`
  background-color: #c23616;
  border-radius: 5px;
  color: ${(props) => props.theme.white.darker};
  font-weight: 400;
  font-size: 13px;
  margin-right: 5px;
  margin-top: 10px;
  padding: 3px 5px;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -50,
    scale: 1.3,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

interface RouteParams {
  tvId: string;
}

interface sliderProps {
  loading: boolean;
  data?: IGetOnTheAirTV;
  title: string;
  keyword?: string;
}

function TVSlider({ keyword, loading, data, title }: sliderProps) {
  const { tvId } = useParams<RouteParams>();
  const history = useHistory();
  const { scrollY } = useViewportScroll();

  const { data: detailData, isLoading: detailLoading } =
    useQuery<IGetTvDetails>(["movies", "detail"], () => getTvDetails(tvId), {
      enabled: !!tvId,
    });

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      //else,
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (tvId: number) => {
    keyword
      ? history.push(`/search/${keyword}/tv/${tvId}`)
      : history.push(`/tv/${tvId}`);
  };

  const onOverlayClick = () => {
    keyword ? history.push(`/search/${keyword}`) : history.push("/tv");
  };

  const clickedMovie =
    tvId && data?.results.find((movie) => movie.id === +tvId);

  return (
    <div style={{ padding: "20px" }}>
      <SliderTitle>{title}</SliderTitle>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={title + movie.id + ""}
                  key={movie.id}
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  whileHover="hover"
                  initial="normal"
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <MoveBtn onClick={increaseIndex} />
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {clickedMovie && (
          <>
            {console.log(clickedMovie)}
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              // layoutId={tvId}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              exit={{ scale: 0 }}
              style={{
                top: scrollY.get() + 100,
              }}
            >
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                >
                  <BigTitle>{clickedMovie.name}</BigTitle>
                </BigCover>
                <BigOverview>
                  {clickedMovie.overview}

                  <Detail>
                    {detailData?.genres.map((i) => (
                      <SmallDetail key={i.id}>{i.name}</SmallDetail>
                    ))}
                    <SmallDetail style={{ backgroundColor: "#be972c" }}>
                      {detailData?.runtime} min
                    </SmallDetail>
                    <SmallDetail
                      style={{
                        border: "0.1px solid white",
                        backgroundColor: "transparent",
                      }}
                    >
                      rating : {detailData?.vote_average}
                    </SmallDetail>
                  </Detail>
                </BigOverview>
              </>
            </BigMovie>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
export default TVSlider;
