import { API_URL } from "../global";

export const getUserData = async () => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            userRead {
              id
              googleId
              email
              displayName
              introduction
              pictureUrl
            }
          }
        `,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.userRead;

  } catch (error: any) {
    throw error;
  }
}

export const loginGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
}

export const logoutUser = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return response;
  } catch (error: any) {
    throw error;
  }
};