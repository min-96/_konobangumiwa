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
  comment: string,
  evaluation: number,
  animationId: number,
}

export interface ReviewRelation extends Review {
  user: User;
  animation: Movie;
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

export interface Wish {
  id: number;
  animationId: number;
  userId: number;
  animation: Movie;
}

export interface TypeCount {
  type: string;
  count: number;
}