import { create } from 'zustand';

const useConversation = create((set) => ({
  selectconversation: null,
  setSelectconversation: (selectconversation) => set({ selectconversation }), // Correct usage
  messages: [],
  setMessages: (messages) => set({ messages }), // Correct usage
}));

export default useConversation;
