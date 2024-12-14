<template>
  <h3>상품 관리</h3>
  <hr />

  <br />
  <br />

  <h3>상품 등록</h3>
  <hr />

  <div class="mb-3">
    <label class="form-label"> 상품명</label>
    <input
      type="text"
      class="form-control"
      placeholder="상품명을 적어주세요"
      v-model="products.name"
    />
  </div>

  <br />

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">카테고리</label>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="products.karegorie"
    >
      <option selected>제품 카테고리를 선택하세요</option>
      <option value="두루마기">두루마기</option>
      <option value="저고리">저고리</option>
      <option value="바지">바지</option>
      <option value="치마">치마</option>
    </select>
  </div>

  <br />

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label"
      >성별(Sex)</label
    >
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="products.gender"
    >
      <option selected>제품 성별 카테고리를 선택하세요</option>
      <option value="남성">남성</option>
      <option value="여성">여성</option>
      <option value="남녀공용">남녀공용</option>
    </select>
  </div>

  <br />

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label"
      >단일 가격 지정</label
    >
    <input
      class="form-control"
      type="number"
      placeholder="가격 지정을 해주세요"
      aria-label="default input example"
      v-model="products.price"
    />
  </div>

  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">상세내용</label>
    <textarea
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3"
      v-model="products.contents"
    ></textarea>
  </div>

  <br />
  <!-- 이미지 업로드 -->
  <h3>이미지 업로드</h3>
  <hr />
  <div class="mb-3">
    <label class="form-label">이미지 업로드</label>
    <input
      type="file"
      class="form-control"
      multiple
      @change="handleImageUpload"
    />
  </div>

  <!-- 등록 및 취소 버튼 -->
  <div class="text-center">
    <button type="button" class="btn btn-primary me-2" @click="save">
      등록
    </button>
    <a href="/AdminMerchandise">
      <button type="button" class="btn btn-danger">취소</button>
    </a>
  </div>

  <br />
  <br />
  <br />
</template>
<script>
import ProductService from "@/services/basic/ProductService";
export default {
  data() {
    return {
      products: {
        name: "",
        karegorie: "",
        gender: "",
        price: 0,
        contents: "",
        sales: 0, // 초기값
      },
      images: [], // 업로드할 이미지 파일
    };
  },

  methods: {
    handleImageUpload(event) {
      this.images = Array.from(event.target.files); // 선택한 파일들을 배열로 저장
    },

    async save() {
      try {
        // 상품 등록
        const response = await ProductService.insert({
          ...this.products,
          images: this.images,
        });

        // 성공 메시지 출력 및 초기화
        alert("상품이 성공적으로 등록되었습니다. 상품 ID: " + response.prid);
        this.products = {
          name: "",
          karegorie: "",
          gender: "",
          price: 0,
          contents: "",
          sales: 0,
        };
        this.images = [];
      } catch (error) {
        console.error("상품 등록 오류:", error);
        alert("상품 등록에 실패했습니다.");
      }
    },
  },
};
</script>
<style></style>
