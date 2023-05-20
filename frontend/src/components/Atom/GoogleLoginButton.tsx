import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { API_URL } from '../../global';

const GoogleLoginButton: React.FC = () => {
  // const handleSuccess = (response : any) => {
  //   console.log("success");
  //   console.log(response);
  // }
  // const handleFailure = () => {
  //   console.log("failure");
  // }

  const handleLogin = () => {
    // 로그인 처리를 수행하는 함수
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <button
      className="flex items-center justify-center shadow-border px-4 py-2 font-bold bg-white"
      onClick={handleLogin}
    >
      <FcGoogle className="w-6 h-6 mr-4" />
      <p className="text-gray-600 px-2">
        Sign in with Google
      </p>
    </button>
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
    //   <GoogleLogin
    //     text="signin_with"
    //     onSuccess={handleSuccess}
    //     onError={handleFailure}
    //     type='standard'
    //     width='230'
    //     login_uri={GOOGLE_CALLBACK_URL || ''}
    //   />
    // </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;