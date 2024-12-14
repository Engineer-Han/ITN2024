<template>
  <h3>상품 관리</h3>
  <hr />

  <br />
  <br />

  <h3>상품 상세조회</h3>
  <hr />

  <div class="text-center">
    <div class="row fs-4">
      <div class="col">
        <label class="form-label"> 상품명</label>
      </div>
      <div class="col">
        {{ products.name }}
      </div>
    </div>
    <hr />
    <br />

    <div class="row fs-4">
      <div class="col">
        <label class="form-label">카테고리</label>
      </div>
      <div class="col">
        {{ products.karegorie }}
      </div>
    </div>
    <hr />
    <br />

    <div class="row fs-4">
      <div class="col">
        <label class="form-label">제품 성별</label>
      </div>
      <div class="col">
        {{ products.gender }}
      </div>
    </div>
    <hr />
    <br />

    <div class="row fs-4">
      <div class="col">
        <label class="form-label">제품 단일 가격</label>
      </div>
      <div class="col">
        {{ products.price }}
      </div>
    </div>
    <hr />
    <br />

    <div class="row fs-4">
      <div class="col">
        <label class="form-label">제품 상세내용</label>
      </div>
      <div class="col">
        {{ products.contents }}
      </div>
    </div>
    <hr />
    <br />

    <!-- 사진 파일 입력 -->
    <h3>메인 사진 (페이지 상단)</h3>
    <hr />

    <div class="text-center">
      <label for="exampleFormControlTextarea1" class="form-label"
        >메인 사진</label
      >
      <br />
      <div v-if="images.length">
        <div class="text-center">
          <img :src="images[0]" alt="첫 번째 이미지" class="img-fluid" />
        </div>
      </div>
      <div v-else>이미지가 없습니다.</div>
    </div>
    <br />
    <div class="text-center">
      <label for="exampleFormControlTextarea1" class="form-label"
        >메인 서브 사진 2개</label
      >
      <br />
      <div v-if="images.length">
        <div class="text-center">
          <img :src="images[1]" alt="첫 번째 이미지" class="img-fluid" />
        </div>
      </div>
      <div v-else>이미지가 없습니다.</div>

      <br />

      <div v-if="images.length">
        <div class="text-center">
          <img :src="images[2]" alt="첫 번째 이미지" class="img-fluid" />
        </div>
      </div>
      <div v-else>이미지가 없습니다.</div>
    </div>

    <br />
    <br />

    <h3>상세 사진 (이미지 하단)</h3>
    <hr />
    <div class="text-center">
      <label for="exampleFormControlTextarea1" class="form-label"
        >상세사진</label
      >

      <div v-if="images.length > 3">
        <div
          v-for="(image, index) in images.slice(3)"
          :key="index"
          class="text-center mt-5"
        >
          <img :src="image" :alt="`이미지 ${index + 4}`" class="img-fluid" />
        </div>
        <br />
      </div>
      <div v-else>이미지가 충분하지 않습니다.</div>
    </div>
  </div>
  <br />
  <br />

  <div class="text-center">    
    <button type="button" class="btn btn-danger me-2" @click="remove">
      삭제
    </button>
    <a href="/AdminMerchandise"
      ><button type="button" class="btn btn-warning">뒤로가기</button></a
    >
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
        prid: this.$route.params.prid,
        code: "",
        name: "",
        karegorie: "",
        gender: "",
        price: "",
        contents: "",
        inserTime: "",
        updateTime: "",
      },
      images: [],
    };
  },
  methods: {
    async getDetail(prid) {
      try {
        let response = await ProductService.getAdmin(prid);
        console.log(response.data);
        this.products = response.data.product;
        this.images = response.data.images || [];
      } catch (error) {
        console.log(error);
      }
    },

    async remove() {
      try {
        let response = await ProductService.remove(this.products.prid);
        console.log(response.data);
        this.$router.push("/AdminMerchandise");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getDetail(this.$route.params.prid);
  },
};
</script>
<style></style>
