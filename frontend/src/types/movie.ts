export interface Movie {
  id: string,
  thumbnail: string,
  title: string,
  rating: number,
};

export interface MovieDetail extends Movie {
  detailImage: string,
};