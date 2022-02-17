import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { authLogin, authRefresh, authTestLogin, updateAuthHeader } from 'src/lib/api';
import { isAuthRefreshLoading, isUserLoggedIn, isMySidebarOpen } from 'src/lib/store';

export const useAuthRefresh = () => {
  const { pathname } = useLocation();
  const setLoading = useSetRecoilState(isAuthRefreshLoading);
  const setIsLoggedIn = useSetRecoilState(isUserLoggedIn);

  useEffect(() => {
    refreshAuthTokens();
  }, []);

  const refreshAuthTokens = async () => {
    if (pathname === '/oauth-redirect') {
      return;
    }

    setLoading(true);
    try {
      const { accessToken } = await authRefresh();
      updateAuthHeader(accessToken);
      setIsLoggedIn(!!accessToken);
    } catch (err) {
      handleRefreshError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshError = ({ response }: AxiosError) => {
    switch ((response as AxiosResponse).status) {
      case 400:
        // REFRESH_TOKEN 빈 문자열
        break;
      case 404:
        // REFRESH_TOKEN 값 있으나 DB에서 값 찾을 수 없음
        break;
      default:
      // 그 외 Error
    }
  };
};

export const useAuthLogin = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isUserLoggedIn);

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const code = searchParams.get('code');
    if (!code) {
      return;
    }

    const scope = searchParams.get('scope');
    const provider = scope?.includes('google') ? 'google' : 'github';

    try {
      const { accessToken } = await authLogin(provider, code);
      alert('로그인되었습니다.');
      updateAuthHeader(accessToken);
      setIsLoggedIn(!!accessToken);
      navigate('/');
    } catch (err) {
      alert('로그인에 실패하였습니다.');
    }
  };
};

// 개발, 테스트용 로그인
export const useAuthTestLogin = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isUserLoggedIn);

  const testLogin = async () => {
    try {
      const { accessToken } = await authTestLogin(process.env.REACT_APP_TEST_REFRESH_TOKEN as string);
      alert('로그인되었습니다.');
      updateAuthHeader(accessToken);
      setIsLoggedIn(!!accessToken);
      navigate('/');
    } catch (err) {
      alert('로그인에 실패하였습니다.');
    }
  };

  return { testLogin };
};

export const useLoginStatus = () => {
  // @TO_BE_IMPROVED: isSidebarOpen 상태 글로벌로 만들고 로그인 필요할 때 열리게 수정
  const isLoggedIn = useRecoilValue(isUserLoggedIn);
  const setIsSidebarOpen = useSetRecoilState(isMySidebarOpen);

  const checkIsLoggedIn = () => {
    if (isLoggedIn) return true;
    alert('로그인이 필요한 기능입니다.');
    setIsSidebarOpen(true);
    return false;
  };

  return { checkIsLoggedIn };
};
