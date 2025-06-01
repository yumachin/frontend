import { io } from 'socket.io-client';

// バックエンドサーバーのURL
const URL = process.env.NEXT_PUBLIC_SOCKET_URL

export const socket = io(URL, {
  // 自動接続をオフにする
  autoConnect: false,
});