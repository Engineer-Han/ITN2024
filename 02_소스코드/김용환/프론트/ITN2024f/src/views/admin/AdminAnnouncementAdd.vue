<template>
  <h3>공지사항</h3>
  <hr />

  <br />
  <br />

  <h3>공지사항 등록</h3>
  <hr />

  <div class="mb-3">
    <label class="form-label"> 제목</label>
    <input
      type="text"
      class="form-control"
      placeholder="제목을 적어주세요"
      v-model="notice.title"
    />
  </div>

  <br />

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">본문</label>
    <textarea
      class="form-control"
      rows="3"
      v-model="notice.contents"
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
    <button type="button" class="btn btn-primary me-2" @click="save">
      등록
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
      notice: {
        title: "",
        contents: "",
        imageUrl: "",
        image: undefined,
        // TODO : Email 나중에 소프트 코딩하기
        writer: "ITN2024@gmail.com",
      },
    };
  },
  methods: {
    select() {
      this.notice.image = this.$refs.file.files[0];
    },
    async save() {
      try {
        let response = await AnnouncementService.insert(this.notice);
        console.log(response.data);
        this.$router.push("/AdminAnouncement");
      } catch (error) {
        this.notice.image = undefined;
        console.log(error);
      }
    },
  },
};
</script>
<style></style>
