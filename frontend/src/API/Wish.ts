

export const getAnimationMyWish = async (
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
            wishYN (animationId: ${animationId})
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.wishYN;

  } catch (error: any) {
    throw error;
  }
}

export const deleteAnimationMyWish = async (
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
          mutation {
            deleteWish (animationId: ${animationId}) {
              id
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.deleteWish;

  } catch (error: any) {
    throw error;
  }
}

export const createAnimationMyWish = async (
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
          mutation {
            createWish (animationId: ${animationId}) {
              id
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.createWish;

  } catch (error: any) {
    throw error;
  }
}

export const getUserWishes = async (
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
            readWishList(userId: ${userId}) {
              id
              animationId
              userId
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
    return result.data.readWishList;

  } catch (error: any) {
    throw error;
  }
}
