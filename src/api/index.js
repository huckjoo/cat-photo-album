const BASE_URL = `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`;

export async function request(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id ? id : ''}`);
    if (!res.ok) {
      throw new Error('서버에 문제가 있습니다.');
    }
    return res.json();
  } catch (e) {
    throw new Error('문제가 생겼습니다.');
  }
}
