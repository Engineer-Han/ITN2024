<template>


  <h3>공지사항</h3>
  <hr />

  <br />
  <br />

  <h3>공지사항 조회</h3>
  <hr />

  <!-- TODO : div에 v-model 써서 작성자, 등록날짜 넣기 -->
  <div class="container text-center">
    <div class="row">
      <div class="col">{{ notices.writer }}</div>

      <div class="col">{{ notices.insertTime }}</div>
    </div>
  </div>

  <hr />

  <div class="mb-3">
    <!-- TODO : div에 v-model 써서 제목 넣기 -->
    <div class="fs-3 text-center">{{ notices.title }}</div>
  </div>
  <hr />

  <!-- TODO : div에 v-model 써서 사진데이터 넣기 -->
  <div class="text-center">
    <img :src="notices.imageUrl" alt="Photo" />
  </div>
  <hr />
  <br />

  <div class="mb-3">
    <!-- TODO : div에 v-model 써서 내용 넣기 -->
    <div class="fs-4 text-center">
      {{ notices.contents }}
    </div>
  </div>
  <hr />

  <br />

  <div class="text-center">
    <router-link :to="'/AdminAnouncementUpdate/' + notices.noid"
      ><button type="button" class="btn btn-primary me-2">
        수정
      </button></router-link
    >

    <button type="button" class="btn btn-danger me-2" @click="remove">
      삭제
    </button>
    <a href="/AdminAnouncement"
      ><button type="button" class="btn btn-secondary">확인/뒤로가기</button></a
    >
  </div>

  <br />
  <br />
</template>
<script>
import AnnouncementService from "@/services/basic/AnnouncementService";
export default {
  data() {
    return {
      notices: {
        noid: this.$route.params.noid,
        title: "",
        contents: "",
        imageUrl: "",
        image: undefined,
        writer: "",
        insertTime: "",
        updateTime: "",
      },
    };
  },
  methods: {
    async getDetail(noid) {
      try {
        let response = await AnnouncementService.get(noid);
        console.log(response.data);
        this.notices = response.data;
      } catch (error) {
        console.log(error);
      }
    },   

    async remove() {
      try {
        let response = await AnnouncementService.remove(this.notices.noid);
        console.log(response.data); // 디버깅
        // 전체조회 화면 강제 이동
        this.$router.push("/AdminAnouncement");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getDetail(this.$route.params.noid);
  },
};
</script>
<style></style>
