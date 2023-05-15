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
  profileURL?: string,
  content: string,
  rating: number,
  movieId: number,
}