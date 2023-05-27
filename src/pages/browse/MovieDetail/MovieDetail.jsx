import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";

import { MovieContext } from "../../../movieContext";
import classes from "./MovieDetail.module.css";

//Component MovieDetail cho nội dung chi tiết của film
function MovieDetail() {
  const [movieContent, setMovieContent] = useState();
  const [idVideo, setIdVideo] = useState(null);

  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //Sử dụng useEffect để lấy dữ liệu film hiện tại để hiển thị nội dung cho component
  useEffect(() => {
    setMovieContent({
      name: movieCtx.currentMovie?.name,
      releaseDate: movieCtx.currentMovie?.releaseDate,
      vote: movieCtx.currentMovie?.vote,
      overview: movieCtx.currentMovie?.overview,
    });
  }, [movieCtx.currentMovie]);

  //Sử dụng useEffect để fetch api dữ liệu để lấy dữ liệu cho video trailer
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieCtx.currentMovie.id}/videos?api_key=224ac0b9d8fc38f654e9864467a29daa`
        );
        if (!response) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        const videoIndex = data.results?.findIndex(
          (movie) =>
            movie.site === "YouTube" &&
            (movie.type === "Trailer" || movie.type === "Teaser")
        );

        if (videoIndex === undefined) {
          return;
        } else if (videoIndex !== -1) {
          setIdVideo(data.results[videoIndex].key);
        } else {
          setIdVideo(null);
        }
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchApi();
  }, [movieCtx.currentMovie]);

  //Biến để hiển thị video (nếu ko có video thì hiển thị backdrop)
  const videoRender =
    movieCtx.currentMovie && idVideo ? (
      <YouTube
        className={classes.youtube}
        videoId={idVideo}
        opts={{
          height: "390",
          width: "640",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    ) : (
      <img
        className={classes.backdrop}
        src={`https://image.tmdb.org/t/p/w500${movieCtx.currentMovie.backdrop}`}
        alt={movieCtx.currentMovie.name}
      />
    );

  return (
    <div className={classes.movie}>
      <div className={classes.detail}>
        <h4>{movieContent?.name}</h4>
        <p className={classes.date}>
          Release Date:{" "}
          {movieContent?.releaseDate ? movieContent?.releaseDate : "Not update"}
        </p>
        <p className={classes.vote}>Vote: {movieContent?.vote}/10</p>
        <p>{movieContent?.overview}</p>
      </div>
      <div className={classes.video}>{videoRender}</div>
    </div>
  );
}

export default MovieDetail;
