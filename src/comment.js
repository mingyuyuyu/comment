const commentList = {
    template: `
      <div class="comments_list">
        <ul>
          <li v-for="item in list" style="display: flex" >
            <div @click="toggleShow(item)" style="padding-right: 10px">{{item['showFlag'] ? 'hide↑' : 'show↓'}}</div>
            <div v-show="item['showFlag']">
              <div>
                  {{item.content}}
                  <button @click="showReply(item)">reply</button>
                  <div v-if="item['showReply']">
                      <textarea v-model="reply"></textarea>
                      <button @click="sendReply(item)">send</button>
                  </div>
              </div>
              <commment :list="item.reply" v-if="item.reply.length"></commment>
            </div>
          </li>
        </ul>
      </div>
    `,
    name: "Commment",
    props: {
        list: {
            default: [],
            type: Array,

        }
    },
    data() {
        return {
            reply: '',
            item: '',
            idx: ''
        }
    },
    methods: {
        toggleReply(item, flag) {
            this.$set(item, 'showReply', flag)
        },
        showReply(item) {
            this.toggleReply(item, !item['showReply'])
        },
        sendReply(item) {
            if (!this.reply.trim().length) return
            item.reply.push({
                content: this.reply,
                showFlag: true,
                reply: []
            })
            this.reply = ''
            this.toggleReply(item, false)
        },
        toggleShow(item) {
            item.showFlag = !item.showFlag
        }
    },
}


new Vue({
    template: `<div class="comments-list">
      <textarea v-model="comments"></textarea>
      <button @click="addMoment">add moment</button>
      <comment-list :list="commentsList"></comment-list>
    </div>`,
    components: {
        commentList
    },
    data() {
        return {
            comments: "",
            commentsList: []
        };
    },
    methods: {
        addMoment() {
            if (!this.comments.trim().length) return;

            this.commentsList.push({
                content: this.comments,
                showFlag: true,
                reply: []
            });
            this.comments = "";
        },
    }
}).$mount('#app')