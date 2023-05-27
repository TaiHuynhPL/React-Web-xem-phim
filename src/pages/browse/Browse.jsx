import React, { useContext } from "react";

import { MovieContext } from "../../movieContext";
import NavBar from "./NavBar/NavBar";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
import MovieDetail from "./MovieDetail/MovieDetail";
import useFetch from "../../hooks/use-fetch";
import classes from "./Browse.module.css";

//Component trang Browse (trang chính)
function Browse() {
  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //Token để sử dụng cho API.
  const API_KEY = "224ac0b9d8fc38f654e9864467a29daa";
  //Biến cho tất cả parameter api để lấy dữ liệu
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  //=======================
  //Sử dụng hooks useFetch đã custom để lấy tất cả dữ liệu của film
  const dataNetflixOriginals = useFetch(requests.fetchNetflixOriginals);
  const dataTrending = useFetch(requests.fetchTrending);
  const dataTopRated = useFetch(requests.fetchTopRated);
  const dataActionMovies = useFetch(requests.fetchActionMovies);
  const dataComedyMovies = useFetch(requests.fetchComedyMovies);
  const dataHorrorMovies = useFetch(requests.fetchHorrorMovies);
  const dataRomanceMovies = useFetch(requests.fetchRomanceMovies);
  const dataDocumentaries = useFetch(requests.fetchDocumentaries);

  //=====================
  //Dựa vào state cục bộ movie hiện tại người dùng đang xem mà hiển thị chi tiết film đúng nội dung và vị trí
  const detailOriginals = movieCtx.currentMovie?.type === "Originals" && (
    <MovieDetail />
  );
  const detailTrending = movieCtx.currentMovie?.type === "Trending" && (
    <MovieDetail />
  );
  const detailTopRated = movieCtx.currentMovie?.type === "TopRated" && (
    <MovieDetail />
  );
  const detailActionMovies = movieCtx.currentMovie?.type === "ActionMovies" && (
    <MovieDetail />
  );
  const detailComedyMovies = movieCtx.currentMovie?.type === "ComedyMovies" && (
    <MovieDetail />
  );
  const detailHorrorMovies = movieCtx.currentMovie?.type === "HorrorMovies" && (
    <MovieDetail />
  );
  const detailRomanceMovies = movieCtx.currentMovie?.type ===
    "RomanceMovies" && <MovieDetail />;
  const detailDocumentaries = movieCtx.currentMovie?.type ===
    "Documentaries" && <MovieDetail />;

  //  Hiển thị nội dung khi đã fetch dữ liệu thành công
  if (
    dataNetflixOriginals.results &&
    dataTrending.results &&
    dataTopRated.results &&
    dataActionMovies.results &&
    dataComedyMovies.results &&
    dataHorrorMovies.results &&
    dataRomanceMovies.results &&
    dataDocumentaries.results
  ) {
    return (
      <div className={classes.browse}>
        <NavBar />
        <Banner data={dataNetflixOriginals} />
        <MovieList
          data={dataNetflixOriginals}
          isBackdrop={false}
          type="Originals"
        />
        {detailOriginals}
        <h3 className={classes.title}>Xu hướng</h3>
        <MovieList data={dataTrending} type="Trending" />
        {detailTrending}
        <h3 className={classes.title}>Xếp hạng cao</h3>
        <MovieList data={dataTopRated} type="TopRated" />
        {detailTopRated}
        <h3 className={classes.title}>Hành động</h3>
        <MovieList data={dataActionMovies} type="ActionMovies" />
        {detailActionMovies}
        <h3 className={classes.title}>Hài</h3>
        <MovieList data={dataComedyMovies} type="ComedyMovies" />
        {detailComedyMovies}
        <h3 className={classes.title}>Kinh dị</h3>
        <MovieList data={dataHorrorMovies} type="HorrorMovies" />
        {detailHorrorMovies}
        <h3 className={classes.title}>Lãng mạn</h3>
        <MovieList data={dataRomanceMovies} type="RomanceMovies" />
        {detailRomanceMovies}
        <h3 className={classes.title}>Tài liệu</h3>
        <MovieList data={dataDocumentaries} type="Documentaries" />
        {detailDocumentaries}
      </div>
    );
    //Còn nếu chưa fetch được dữ liệu thì hiển thị Loading...
  } else {
    return <p>Loading...</p>;
  }
}

export default Browse;
