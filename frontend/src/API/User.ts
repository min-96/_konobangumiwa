import { API_URL } from "../global";

export const getMyData = async () => {
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

export const updateUserData = async ({
  displayName,
  pictureUrl,
  introduction,
}: {
  displayName?: string;
  pictureUrl?: string;
  introduction?: string;
}) => {
  const mutation = `
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        displayName
        pictureUrl
        introduction
      }
    }
  `;

  const variables = {
    input: {
      displayName: displayName,
      pictureUrl: pictureUrl,
      introduction: introduction
    },
  };

  try {
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
    return result.data.updateUser;
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