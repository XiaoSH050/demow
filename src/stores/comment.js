import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCommentStore = defineStore('comment', () => {
    const showReply = ref(false)
    const replyClick = (item) => {
        showReply.value = item.id;
    };
    const closeReply = (item) => {
        showReply.value = false;
    };
    return { showReply, replyClick, closeReply }
},
    {
        persist: true
    }
)
