
export const getMovies = async (
  {queryName, queryParams}
  : {queryName: string, queryParams?: string}) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            ${queryName} ${queryParams ? queryParams: ''} {
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


export const getAllGenres = async () => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            genreTypeList {
              type
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.genreTypeList;
  } catch (error: any) {
    throw error;
  }
}


export const getAllTags = async () => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            tagTypeList {
              type
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.tagTypeList;
  } catch (error: any) {
    throw error;
  }
}