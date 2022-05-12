const BASE_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${nodeId ? nodeId : ''}`);
    if (!res.ok) {
      throw new Error('서버가 이상해요!');
    }
    return res.json();
  } catch (e) {
    throw new Error(`뭔가 잘못됨: ${e.message}`);
  }
};
