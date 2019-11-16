<template>
  <div class="hello">
    <h2>THREAD COUNTER</h2>
    <div class="rotate-cont">
      <div v-show="requestPending" class="rotate-arrows">↻</div>
    </div>
    <p
      class="animated"
      :class="{ 'animate-post': animate }"
      @animationend="animate = false"
    >
      CURRENT LAST ID: {{ lastPostID }}
    </p>
    <p>ID GREW BY {{ delta }}</p>
    <p>CURRENT POSTS-PER-SECOND: {{ postsPerSecond }}</p>
    <p>TIME IT TOOK TO UPDATE: {{ timeBetweenUpdates }} SECONDS</p>
    <p>TIME PASSED SINCE LAST UPDATE: {{ timePassedSeconds }}</p>
    <p>CHANCE OF FIVE: {{ chanceOf5 }}%</p>
    <input type="checkbox" @change="toggleInterval()" label="Toggle Interval" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function() {
    return {
      lastPostID: 0,
      catalog: [],
      lastPost: [],
      intervalID: null,
      requestPending: false,
      animate: false,
      delta: 0,
      timeStamp: null,
      postsPerSecond: null,
      timeBetweenUpdates: 0,
      timePassedSeconds: 0
    };
  },
  created() {
    this.initRefresh();
  },
  computed: {
    chanceOf5() {
      /*
      based on pure observation, 
      i estimate that given 1 post per second (pps), around 10 new posts will be added between an update and clicking on submit as quickly as possible, 
      and 20 new posts per 2pps
      and i calculate this chance based on that assumption
      */
      return (
        100 -
        Math.abs(((this.postsPerSecond * 10 + this.lastPostID) % 10) - 5) * 20
      ).toFixed(2);
    }
  },
  methods: {
    initRefresh() {
      this.refreshStart();
      this.intervalID = setInterval(this.refreshStart, 1000);
    },
    async refreshStart() {
      if (!this.requestPending) {
        this.requestPending = true;
        await this.refreshPostID();
        this.requestPending = false;
      }
    },
    async refreshPostID() {
      this.catalog = await this.$api.getCatalog("v");
      this.analyzeCatalog();
    },
    toggleInterval() {
      if (this.intervalID) {
        clearInterval(this.intervalID);
        this.intervalID = null;
      } else {
        this.initRefresh();
      }
    },
    analyzeCatalog() {
      let newMax = this.catalog.reduce((finalMaxID, page) => {
        let pageMaxID = page.threads.reduce((maxID, thread) => {
          let lastPost = this.getLastPostIDFromThread(thread);
          return lastPost > maxID ? lastPost : maxID;
        }, 0);
        return pageMaxID > finalMaxID ? pageMaxID : finalMaxID;
      }, 0);

      this.animate = newMax - this.lastPostID;
      this.timePassedSeconds = (Date.now() - this.timeStamp) / 1000;
      if (this.animate) {
        this.timeBetweenUpdates = this.timePassedSeconds;
        this.delta = newMax - this.lastPostID;
        this.postsPerSecond = (this.delta / this.timePassedSeconds).toFixed(2);
        this.timeStamp = Date.now();
      }
      this.lastPostID = newMax;
    },
    getLastPostIDFromThread(thread) {
      if (!thread.last_replies) {
        return thread.no;
      }
      return thread.last_replies[thread.last_replies.length - 1].no;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

.animate-post {
  animation: highlight 2s;
}
.rotate-cont {
  height: 50px;
  overflow: hidden;
}

.rotate-arrows {
  display: block;
  margin: auto;
  padding: 0;
  color: coral;
  border: 0;
  animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes highlight {
  50% {
    color: crimson;
    filter: drop-shadow(0px 0px 4px black);
  }
  100% {
    color: black;
    filter: drop-shadow(0px 0px 0px black);
  }
}
</style>
