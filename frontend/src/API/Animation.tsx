
export const getMovies = async ({queryName} : {queryName : string}) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            ${queryName} {
              id   
              title
              thumbnail
              grade
              reviewCount
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data[queryName];

  } catch (error: any) {
    throw error;
  }
}

export const getMovieDetail = async ({movieId} : {movieId: number}) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            detailAnimation(id: ${movieId}) {
              id   
              title
              release
              introduction
              thumbnail
              backgroundImg
              crops_ratio
              grade
              author
              reviewCount
              genreList {
                genretypeId
              }
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.detailAnimation;

  } catch (error: any) {
    throw error;
  }
}

export const searchTitle = async ({title} : {title : string}) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            searchTitle(title: "${title}") {
              id   
              title
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.searchTitle;
  } catch (error: any) {
    throw error;
  }
}