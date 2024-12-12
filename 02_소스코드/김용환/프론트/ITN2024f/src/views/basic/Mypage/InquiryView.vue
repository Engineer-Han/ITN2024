<template>
    <div>
        <div class ="container all mt-5"> 
        <h1 class="title">MY PAGE</h1> 

        <hr class="hr2">


         <div class="left">

            <li class="list-group-item p1">마이페이지</li>
            <hr>
            <br>

            <li class="list-group-item p"> 나의 쇼핑  </li>
            <li class="list-group-item p2">
                <router-link to="/mypage">-구매 내역 조회</router-link>
             </li>
            <br>
            <li class="list-group-item p">나의 활동</li>
            <li class="list-group-item p2">
                <router-link to="/inquiry"> -1:1 문의하기 </router-link>
            </li>

            <br>
            <li class="list-group-item p">나의정보</li>
            <li class="list-group-item p2">
                <router-link to ="/mypage/memberinfo">-회원 정보</router-link>
            </li>


        </div>

        

        <div class="main">
           
            <h2>1:1 문의내역</h2>

            <table class="table buy-list mt-3">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                    <th scope="col">답변</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(data, index) in inquiries" :key="index">
                    <td>{{data.iqid}}</td>

                      <td><router-link :to='"/inquiry/" + data.iqid'>
                    {{data.title}} 
                     </router-link></td>

                    <td>{{data.insertTime}}</td>
                    <td>{{data.answerContent ? "Y" : "N"}}</td>
                  </tr>               
                </tbody>
              </table>


            <!-- 페이징 -->
            <div class=" page">
                 <b-pagination v-model="pageIndex" :total-rows="totalCount" :per-page="recodeCountPerPage"
                @click="getInquiry"></b-pagination>
            </div>
            
        </div>


        <div class="btn">
            <button class="write-btn">
              <router-link to ="/inquiry/write">글쓰기</router-link>
              </button>
        </div>
        
    </div>    
    </div>
</template>
<script>
import InquiryService from '@/services/basic/InquiryService';
export default {
    data() {
      return {
            pageIndex: 1, 
            totalCount: 0, 
            recodeCountPerPage: 4, 
            searchKeyword: "",
            email:"Electrionc@naver.com",
            inquiries: [], 
      }
    },
    methods: {
        async getInquiry(){
          try {
            let response = await InquiryService.getAll(
                    this.searchKeyword,
                    this.pageIndex - 1,
                    this.recodeCountPerPage,
                    this.email
                );
                 const { results, totalCount } = response.data;
                console.log(response.data); // 디버깅
                this.inquiries = results;
                this.totalCount = totalCount;
            
          } catch (error) {
            console.log(error)
          }
       }
    },
    mounted() {
      this.getInquiry();
      if (!this.$route.query.refreshed) {
    this.$router.replace({
      path: this.$route.path,
      query: { ...this.$route.query, refreshed: true },
    }).then(() => {
      window.location.reload();
    });
  }
    },
}
</script>
<style>
    @import '@/assets/css/Mypage/InquiryView.css';
</style>