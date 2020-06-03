<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <board-list></board-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="light-blue lighten-5"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon
        class="mx-4"
        large
      >
        mdi-factory
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">긍정코딩제작소</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
     <div>
      <v-card>
        <v-responsive :aspect-ratio="16/9">
          <v-container fluid >
            <v-row justify="center">
              <nuxt />
            </v-row>
          </v-container>
        </v-responsive>
      </v-card>
     </div>
    </v-content>
    <v-footer>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            md="12">
            <v-btn fab="true" color="light-blue lighten-5" href="#">
              <v-icon large color="light-blue accent-3">mdi-twitter</v-icon>
            </v-btn>
            <v-btn fab="true" color="light-blue lighten-5" href="#">
              <v-icon large color="light-blue accent-3">mdi-instagram</v-icon>
            </v-btn>
            <v-btn fab="true" color="light-blue lighten-5" href="https://www.facebook.com/hangyu.cho.1">
              <v-icon large color="light-blue accent-3">mdi-facebook</v-icon>
            </v-btn>
            <v-btn fab="true" color="light-blue lighten-5" href="#">
              <v-icon large color="light-blue accent-3">mdi-git</v-icon>
            </v-btn>

            <v-btn fab="true" color="light-blue lighten-5" href="mailto:chg3376@gmail.com">
              <v-icon large color="light-blue accent-3">mdi-email-edit-outline</v-icon>
            </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import index from '~/components/main/index.vue'
  import boardList from '~/components/main/boardList.vue'
  export default {
    components: {
      index,
      boardList
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    mounted() {
    },
    methods: {
    },
    
  }
</script>
<style>
body{
      margin:0;
    }
.v-responsive {
  background-color : rgba(255, 255, 0, 0.8);
  /*background-image: url('https://source.unsplash.com/category/food/1600x900');*/
  background-image: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixlib=rb-1.2.1&q=80&w=1600');
  background-size: cover;
  min-height:100vh;
}
.v-responsive__content {
  background-color : rgba(255,255,255,0.6);
}
.v-navigation-drawer__content{
  background-color : rgb(255, 250, 251);
}
</style>