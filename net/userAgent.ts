// set user agent
let _userAgent: string | null;
 const setUserAgent = (userAgent: string | null) => {
  _userAgent = userAgent;
};

 const getUserAgent = () => {
  return _userAgent;
};

export default {
    setUserAgent,
    getUserAgent
}