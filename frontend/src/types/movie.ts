// export interface Movie {
//   id: string,
//   thumbnail: string,
//   title: string,
//   rating: number,
// };

// export interface MovieDetail extends Movie {
//   detailImage: string,
// };

export interface Review {
  id: number,
  userId: number,
  nickname: string,
  profileUrl?: string,
  content: string,
  rating: number,
  movieId: number,
}

export interface User {
  id: number;
  googleId: string;
  email: string;
  displayName: string;
  introduction: string | null;
  pictureUrl: string | null;
}

export interface Movie {
  id: number;
  title: string;
  thumbnail: string;
  release: string;
  grade: number;
  reviewCount: number;
}

export interface MovieDetail extends Movie {
  introduction: string;
  backgroundImg: string;
  crops_ratio: string;
  author: string;
  genreList: string[];
}