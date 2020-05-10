<template>
  <no-ssr>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-select
              v-model="form.boardId"
              :items="board"
              label="게시판"
              item-text="boardName"
              item-value="boardId"
              data-vv-name="select"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              :counter="10"
              label="게시글 제목"
              required
              :dense="true"
              v-model="form.title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              :counter="10"
              label="주석"
              required
              :dense="true"
              v-model="form.subtitle"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
          cols="12"
          md="12"
          >
            <ValidationProvider v-slot="{ errors }" name="select" rules="required">
              <v-select
                v-model="select"
                :items="items"
                :error-messages="errors"
                label="Select"
                data-vv-name="select"
                required
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-combobox
              v-model="chips"
              :items="items"
              chips
              clearable
              label="게시할 내용을 입력해주세요"
              multiple
              prepend-icon="filter_list"
              solo
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong>&nbsp;
                  <span>(관심사)</span>
                </v-chip>
              </template>
            </v-combobox> 
          </v-col>
          <v-col>
            <v-btn
              color="success"
              class="mr-4"
              @click="submit"
            >
              일시저장
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
            >
              저장
            </v-btn>

            <v-btn
              color="warning"
            >
              취소
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <editor ref="toastuiEditor" :initialValue="form.contents"/>
    <!-- Markdown Viewer -->
    <viewer :initialValue="form.contents" height="500px" />
    <div class="comments">
      <vue-disqus 
        :shortname="disqus_shortname" 
        :identifier="boardDetailId" 
        :url="`${base_url}/posts/${boardName}/${boardDetailId}`"
      ></vue-disqus>
    </div>
  </div>
  </no-ssr>
</template>
<script>

export default {
  computed: {
    isEdit() {
      return (this.boardId || "" ) === ""
    }
  },
  created() {
    var self = this
    let boardName  = self.$route.params.posts
    self.boardName = boardName
    self.boardDetailId   = self.$route.params.id
    let res  = ""
    self.$axios.get("board", {})
      .then(function(res){
        self.board   = res.data.boardList
        self.boardId = (self.board.find(obj => obj.boardName === self.boardName) || {}).boardId
        self.form.boardId = self.boardId
      })
      .then(function(){
        var params   = self.$route.params
        var boardId  = self.boardId
        var detailId = params.id
        if(detailId != 0){
          let url   = `boardDetail/${boardId}/${detailId}`
          self.$axios.get(url, {}).then(function(res){
            self.form = res.data.boardDetailList
            self.$refs.toastuiEditor.editor.setMarkdown(self.form.contents)
          })
        }
      })
  },
  data: () => {
    return {
      base_url: process.env.BASE_URL,
      disqus_shortname: process.env.DISQUS_SHORTNAME,
      form: {
        boardId: 0,
        boardDetailId: 0,
        title: '',
        subtitle: "",
        summary: "",
        contents: "",
      },
      boardId: "",
      boardName: "",
      boardDetailId: "",
      chips: ['코딩', '독서', '운동', '티타임'],
      items: ['자바', '파이썬'],
      editorOptions : {
        minHeight: '200px',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        toolbarItems: [
            'heading',
            'bold',
            'italic',
            'strike',
            'divider',
            'hr',
            'quote',
            'divider',
            'ul',
            'ol',
            'task',
            'indent',
            'outdent',
            'divider',
            'table',
            'image',
            'link',
            'divider',
            'code',
            'codeblock'
        ]
      },
      contents: 'hello world',
      board: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }
  },
  methods: {
    initialize () {
      this.form = {
        title: 'markdown!!!!',
        subtitle: "markdown 사용법 상세!",
        summary: "PlantUMLのお試し",
        contents: "",

      }
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    async submit () {
      var self = this
      let contents = self.$refs.toastuiEditor.editor.getMarkdown()
      self.form.contents = contents
      self.$execAxios(self, "post","boardDetail/" + self.boardId, new URLSearchParams(self.form), function(res){
        if(res.data.status == "200") {
          let posts = self.$route.params.posts
          let id = res.data.entity.boardDetailId
          window.location.href = `/posts/${posts}/${id}`;
        } else {
          console.error(res.data.message)
        }
      })
    },
  }
}
</script>
<style>
.top-width {
  width: calc(100% - 100px);
}
</style>