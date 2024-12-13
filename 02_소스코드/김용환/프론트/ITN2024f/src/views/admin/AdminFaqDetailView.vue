<template>
  <h3>1:1 문의</h3>
  <hr />

  <br />
  <br />

  <h3>1:1 문의 상세 조회</h3>
  <hr />
  <br />

  <!-- TODO : div에 v-model 써서 작성자, 등록날짜 넣기 -->
  <div class="container text-center">
    <div class="row">
      <div class="col">작성자 : {{ inquiries.writer }}</div>
      <div class="col">등록 일시 : {{ inquiries.insertTime }}</div>
      <div class="col">답변 : {{ inquiries.anwser }}</div>
    </div>
  </div>

  <hr />

  <div class="mb-3">
    <!-- TODO : div에 v-model 써서 제목 넣기 -->
    <div class="fs-3 text-center">{{ inquiries.title }}</div>
  </div>
  <hr />

  <div class="mb-3">
    <!-- TODO : div에 v-model 써서 내용 넣기 -->
    <div class="fs-4">
      {{ inquiries.content }}
    </div>
  </div>
  <hr />

  <br />

  <!-- 답변 입력칸 -->
  <div v-if="showReplyInput" class="mt-3">
    <textarea
      class="form-control mb-2"
      rows="3"
      placeholder="답변 내용을 입력하세요"
      v-model="newReply"
    ></textarea>
    <button type="button" class="btn btn-primary me-2" @click="answersave">
      등록
    </button>
    <a href="/AdminFaqDetailView"
      ><button
        type="button"
        class="btn btn-secondary"
        @click="toggleReplyInput"
      >
        취소
      </button></a
    >
  </div>

  <!-- 등록된 답변 -->
  <div v-if="inquiries.answerContent" class="mt-4">
    <hr />
    <h4>답변 내용</h4>
    <div class="list-group-item">
      {{ inquiries.answerContent }}
      <p class="text-end">
        <button type="button" class="btn btn-primary me-2" @click="editAnswer">
          답변 수정
        </button>
        <button type="button" class="btn btn-danger">답변 삭제</button>
      </p>
    </div>
    <hr />
    <br />
  </div>

  <div v-if="!showReplyInput" class="text-center">
    <button
      type="button"
      class="btn btn-primary me-2"
      @click="toggleReplyInput"
    >
      답변하기
    </button>
    <button type="button" class="btn btn-danger me-2">문의 삭제</button>
    <a href="/AdminFaq"
      ><button type="button" class="btn btn-secondary">확인/뒤로가기</button></a
    >
  </div>

  <br />
  <br />
</template>
<script>
import InquiryService from "@/services/basic/InquiryService";
export default {
  data() {
    return {
      showReplyInput: false, // 답변 입력칸 표시 여부
      newReply: "", // 새로운 답변 내용

      inquiries: {
        iqid: this.$route.params.iqid,
        title: "",
        content: "",
        writer: "",
        answerId: null,
        answerContent: "",
        answerWriter: "",
        insertTime: "",
        answerInsertTime: "",
      },
    };
  },
  methods: {
    async getDetail(iqid) {
      try {
        let response = await InquiryService.get(iqid);
        console.log(response.data);
        this.inquiries = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async remove() {
      try {
        let response = await InquiryService.remove(this.inquiries.iqid);
        console.log(response.data); // 디버깅
        // 전체조회 화면 강제 이동
        this.$router.push("/AdminFaq");
      } catch (error) {
        console.log(error);
      }
    },

    toggleReplyInput() {
      this.showReplyInput = !this.showReplyInput; // 답변 입력칸 표시/숨기기
    },
    addReply() {
      if (this.newReply.trim()) {
        this.replies.push(this.newReply); // 답변 목록에 추가
        this.newReply = ""; // 입력칸 초기화
        this.showReplyInput = false; // 입력칸 숨기기
      } else {
        alert("답변 내용을 입력해주세요!");
      }
    },

    async answersave() {
      try {
        const answerData = {
          iqid: this.inquiries.iqid, // 답변의 ID는 문의 ID와 동일
          reid: this.inquiries.iqid, // REID 설정
          contents: this.newReply,
          writer: "ITN2024@gmail.com", // 관리자 정보 설정, 나중에 수정하기
        };

        let response = await InquiryService.insertadmin(answerData);
        console.log(response.data);
        this.$router.push("/AdminFaq");
      } catch (error) {
        console.log(error);
      }
    },

    // async update() {
    //   try {
    //     let response = await InquiryService.update(
    //       this.notices.noid,
    //       this.notices
    //     );
    //     console.log(response.data);
    //     this.inquiries = response.data;
    //     alert("수정되었습니다");
    //     this.$router.push("'/AdminFaqDetailView/' + data.iqid");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  mounted() {
    this.getDetail(this.$route.params.iqid);
  },
};
</script>
<style></style>
