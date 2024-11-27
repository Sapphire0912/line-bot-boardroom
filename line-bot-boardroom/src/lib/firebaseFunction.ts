import { ref, push, onValue } from "firebase/database";
import database from "./firebase";

// 將留言資料儲存至 firebase 資料庫
export const sendMsgToFirebase = async (messageData: {
  username: string | null;
  displayName: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}) => {
  const messageRef = ref(database, "boardrooms");
  await push(messageRef, messageData);
};

// 監聽留言的函數
export const subscribeToBoardrooms = (callback: (data: any[]) => void) => {
  const boardroomsRef = ref(database, "boardrooms");
  return onValue(boardroomsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  });
};
