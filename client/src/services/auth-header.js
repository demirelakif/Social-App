export default function authHeader(contentType) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken , "Content-Type":`${contentType}`};
  } else {
    return {};
  }
}