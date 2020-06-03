<template>
  <v-list dense >
    <v-list-item
        v-for="item in items"
        :key="item.text"
        link
         :href="'/'+item.path"
    >
        <v-list-item-action>
          <v-icon color="blue darken-2">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
              {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    <v-list-item
        class="mt-4"
        link
    >
        <v-list-item-action>

            <template>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="300px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">
                    <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">게시판 등록</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="boardName" label="게시판 이름*" required></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    <small>*필수 입력</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false; execSaveBoard();">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
            </template>

        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">게시판 추가</v-list-item-title>
    </v-list-item>
    <v-list-item link>
        <v-list-item-action>
        <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
    </v-list-item>
    <v-list-item>

        <v-alert :type="alertType" :value="alert" transition="scale-transition">
        <v-row>
            <v-col class="grow">{{ message }}</v-col>
            <v-col class="shrink"><v-btn @click.stop="alert=false">숨기기</v-btn></v-col>
        </v-row>
        </v-alert>
    </v-list-item>
    </v-list>
</template>

<script>
export default {
    data: () => ({
      drawer: null,
      dialog: false,
      alert: false,
      alertType: 'success',//success, warning, error
      boardName: '',
      items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-playlist-play', text: 'Playlists' },
        { icon: 'mdi-domain', text: 'Watch Later' },
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
      message: '저장 완료.',
    }),
    created () {
      var self = this
      this.$vuetify.theme.dark = false
      var arr = [];
      //this.execAxios("get","/osb/board", {}, function(res){
      this.$execAxios(this, "get","board", {}, function(res){
        self.items = self.getBoardList(res.data.boardList);
      })
    },
    mounted () {
    },
    methods: {
      getBoardList: function(list) {
        var arr = []
        list    = list || []
        list.forEach(function(obj){
          arr.push({"icon": "mdi-domain", "text": obj.boardName, "path": "posts/"+obj.boardName});
        })
        return arr
      },
      execSaveBoard: function() {
        var self = this
        var form = new FormData();
        form.set("boardName", this.boardName)
        this.$execAxios(this, "post","board", form, function(res){
          self.items = self.getBoardList(res.data.boardList);
        })
      },
    },
}
</script>

<style>

</style>