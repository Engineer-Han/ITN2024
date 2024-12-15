<template>
  <h3>1:1 문의</h3>
  <hr />

  <br />
  <br />

  <h3>1:1 문의 조회</h3>
  <hr />
  <br />

  <div class="container text-center">
    <div class="row">
      <div class="col">작성자 : {{ inquiries.writer }}</div>
      <div class="col">등록 일시 : {{ inquiries.insertTime }}</div>
      <div class="col">
        답변 : {{ inquiries.answerContent == Null ? "N" : "Y" }}
      </div>
    </div>
  </div>

  <hr />

  <div class="mb-3">
    <div class="fs-3 text-center">{{ inquiries.title }}</div>
  </div>
  <hr />

  <div class="mb-3">
    <div class="fs-4">{{ inquiries.content }}</div>
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
    <a href="/AdminFaqDetailView">
      <button type="button" class="btn btn-secondary" @click="toggleReplyInput">
        취소
      </button>
    </a>
  </div>

  <!-- 등록된 답변 -->
  <div v-if="inquiries.answerContent" class="mt-4">
    <hr />
    <h4>답변 내용</h4>
    <div class="list-group-item">
      <!-- 수정할 답변 내용 표시 -->
      <div v-if="isEditing">
        <textarea
          class="form-control mb-2"
          v-model="updatedReply"
          rows="3"
        ></textarea>
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="saveUpdatedReply"
        >
          수정 저장
        </button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">
          취소
        </button>
      </div>
      <div v-else>
        {{ inquiries.answerContent }}
        <p class="text-end">
          <button type="button" class="btn btn-primary me-2" @click="editReply">
            답변 수정
          </button>
          <button type="button" class="btn btn-danger" @click="removeAnswer">
            답변 삭제
          </button>
        </p>
      </div>
    </div>
    <hr />
    <br />
  </div>

  <div v-if="!showReplyInput" class="text-center">
    <button
      type="button"
      class="btn btn-primary me-2"
      v-if="!inquiries.answerContent"
      @click="toggleReplyInput"
    >
      답변하기
    </button>
    <button type="button" class="btn btn-danger me-2" @click="remove">
      문의 삭제
    </button>
    <a href="/AdminFaq">
      <button type="button" class="btn btn-secondary">확인/뒤로가기</button>
    </a>
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
      updatedReply: "", // 수정된 답변 내용
      isEditing: false, // 답변 수정 여부
      email: "",
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

    async answersave() {
      try {
        const answerData = {
          iqid: this.inquiries.iqid, // 답변의 ID는 문의 ID와 동일
          reid: this.inquiries.iqid, // REID 설정
          contents: this.newReply,
          writer: this.email, // 관리자 정보 설정, 나중에 수정하기
        };

        let response = await InquiryService.insertadmin(answerData);
        console.log(response.data);
        this.$router.push("/AdminFaq");
      } catch (error) {
        console.log(error);
      }
    },

    // 답변 수정 시작
    editReply() {
      this.isEditing = true;
      this.updatedReply = this.inquiries.answerContent; // 수정할 답변 내용 미리 설정
    },

    cancelEdit() {
      this.isEditing = false;
      this.updatedReply = ""; // 수정 취소 시 내용 초기화
    },

    async saveUpdatedReply() {
      console.log("수정 시 이메일 값:", this.email); // 디버깅
      try {
        const updatedData = {
          iqid: this.inquiries.answerId,
          contents: this.updatedReply,
          writer: this.email,
        };

        let response = await InquiryService.update(
          this.inquiries.answerId,
          updatedData
        );
        console.log(response.data);
        this.inquiries.contents = this.updatedReply; // 수정된 답변 내용 반영
        this.isEditing = false; // 수정 모드 종료
        alert("답변이 수정되었습니다.");
      } catch (error) {
        console.log(error);
      }
    },

    // 답변 삭제
    async removeAnswer() {
      try {
        let response = await InquiryService.remove(this.inquiries.answerId);
        console.log(response.data); // 디버깅
        // 전체조회 화면 강제 이동
        this.$router.push("/AdminFaq");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(this.email);
      if (parsedData.email) {
        this.email = parsedData.email; // email 값을 업데이트
        console.log("로그인한 이메일:", this.email);
      } else {
        console.warn("Email 값이 존재하지 않습니다.");
      }
    } else {
      console.warn("localStorage에서 'user' 데이터를 찾을 수 없습니다.");
    }

    this.getDetail(this.$route.params.iqid);
  },
};
</script>
