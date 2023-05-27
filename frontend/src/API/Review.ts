
export const getAnimationReviews = async (
  {animationId, page, pageSize}
  : {animationId:number, page: number, pageSize: number}
  ) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            detailReview (animationId: ${animationId}, page:${page}, pageSize: ${pageSize}) {
              otherReviews {
                id
                userId
                comment
                evaluation
                animationId
                user {
                  id
                  displayName
                  pictureUrl
                }
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
    return result.data.detailReview.otherReviews;

  } catch (error: any) {
    throw error;
  }
}

export const getAnimationMyReview = async (
  {animationId}
  : {animationId:number}
  ) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            detailReview (animationId: ${animationId}, page:0, pageSize: 0) {
              userReview {
                id
                userId
                comment
                evaluation
                animationId
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
    return result.data.detailReview.userReview;

  } catch (error: any) {
    throw error;
  }
}

export const deleteAnimationReview = async (
  { id }
  : {id : number}
  ) => {
  try {
    const mutation = `
      mutation {
        deleteReview(id: ${id}) {
          id
        }
      }
    `;

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.deleteReview;

  } catch (error: any) {
    throw error;
  }
}

export const createAnimationReview = async (
  {animationId, evaluation}
  : {animationId:number, evaluation: number}
  ) => {
  try {
    const mutation = `
      mutation CreateReview ($input: CreateInputReview!) {
        createReview(input: $input) {
          id
          userId
          comment
          evaluation
          animationId
        }
      }
    `;

    const variables = {
      input: {
        animationId,
        evaluation
      },
    };

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.createReview;

  } catch (error: any) {
    throw error;
  }
}


export const updateAnimationReview = async (
  {id, animationId, evaluation, comment}
  : {id: number, animationId:number, evaluation: number, comment?: string | null}
  ) => {
  try {
    const mutation = `
      mutation UpdateReview ($input: UpdateInputReview!) {
        updateReview (input: $input) {
          id
          userId
          comment
          evaluation
          animationId
        }
      }
    `;

    const variables = {
      input: {
        id,
        animationId,
        evaluation,
        comment,
      },
    };

    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.updateReview;

  } catch (error: any) {
    throw error;
  }
}

export const getUserReviews = async (
  {userId}
  : {userId:number}
  ) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            readReivewList(userId: ${userId}) {
              id
              userId
              comment
              evaluation
              animationId
              animation {
                id   
                title
                thumbnail
                grade
                reviewCount
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
    return result.data.readReivewList;

  } catch (error: any) {
    throw error;
  }
}
