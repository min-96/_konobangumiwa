export interface Movie {
  id: string,
  thumbnail: string,
  title: string,
  rating: number,
};

export interface MovieDetail extends Movie {
  detailImage: string,
};

export interface Review {
  id: number,
  userId: number,
  nickname: string,
  profileUrl?: string,
  content: string,
  rating: number,
  movieId: number,
}