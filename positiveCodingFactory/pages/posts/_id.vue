<template>
 <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-btn color="success" @click="toDetail()">글작성</v-btn>
        </v-col>
        <v-col
          v-for="(bean, i) in boardDetailList" :key="i"
          cols="12"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              :elevation="hover ? 16 : 2"
              max-width="700" 
            >
              <v-card-text class="custom-hover" @click="toDetail(bean.boardDetailId)">
                <p class="display-1 text--primary">
                  {{ bean.title}}
                </p>
                <p>{{ bean.subtitle }}</p>
                <div class="text--primary">
                  {{ bean.contents }}
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
 </v-container>
 

</template>

<script>
export default {
    data: function(){
        return {
            items: [],
            boardDetailList: [],
            boardId: "",
            boardName: this.$route.params.id,
            board: [ 
              { 
                boardId: 14,
                boardName: "코딩!"
              }
            ],
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      post () {
        return this.board.find(post => post.boardId == this.boardId)
        // this.board.find(function(post){
        //     console.log(post.boardId, self.boardId)
        //     return post.boardId === self.boardId
        // })
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        var self = this
        let res  = ""
        this.$axios.get("board", {})
          .then(function(res){
            self.board   = res.data.boardList
            self.boardId = (self.board.find(obj => obj.boardName === self.boardName) || {}).boardId
          })
          .then(function(){
            self.$axios.get("boardDetail/" + self.boardId, {})
              .then(function(res){
                self.boardDetailList = res.data.boardDetailList
              })
          })
      },
      toDetail (boardDetailId) {
        let path = this.$route.path
        boardDetailId = boardDetailId || "0"
        window.location.href = `${path}/${boardDetailId}`
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
}
</script>

<style>
.custom-hover{
  cursor: pointer;
}
</style>