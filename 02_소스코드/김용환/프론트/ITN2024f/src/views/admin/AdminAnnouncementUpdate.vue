<template>
  <h3>공지사항</h3>
  <hr />

  <br />
  <br />

  <h3>공지사항 수정</h3>
  <hr />

  <div class="mb-3">
    <label class="form-label"> 제목</label>
    <input
      type="text"
      class="form-control"
      placeholder="제목을 적어주세요"
      v-model="notices.title"
    />
  </div>

  <br />

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">본문</label>
    <textarea
      class="form-control"
      rows="3"
      v-model="notices.contents"
    ></textarea>
  </div>
  <div class="input-group">
    <input
      type="file"
      class="form-control"
      aria-describedby="inputGroupFileAddon04"
      aria-label="Upload"
      ref="file"
      @change="select"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="inputGroupFileAddon04"
    >
      파일 불러오기
    </button>
  </div>

  <br />
  <br />

  <div class="text-center">
    <button type="button" class="btn btn-primary me-2" @click="update">
      수정하기
    </button>
    <a href="/AdminAnouncement"
      ><button type="button" class="btn btn-danger">취소</button></a
    >
  </div>
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
        // TODO : Email 나중에 소프트 코딩하기
        writer: "ITN2024@gmail.com",
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
    select() {
      this.notices.image = this.$refs.file.files[0];
    },
    async update() {
      try {
        let response = await AnnouncementService.update(
          this.notices.noid,
          this.notices
        );
        console.log(response.data);
        this.notices = response.data;
        alert("수정되었습니다");
        this.$router.push("/AdminAnouncement")
      } catch (error) {
        this.notices.image = undefined;
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
