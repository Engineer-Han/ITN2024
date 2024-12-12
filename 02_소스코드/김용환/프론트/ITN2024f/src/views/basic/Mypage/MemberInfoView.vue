<template>
   <div class ="container all mt-5"> 
        <h1 class="title">
          <router-link to="/mypage">MY PAGE</router-link>
        </h1> 

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

        

        <div class="main ">
           
            <h3>회원 정보</h3>

            <table class="table buy-list mt-3">
                <thead>
                  <tr>
                    <th class="email-cell">이메일</th>
                    <th>
                        <input class="form-control" type="text" value="남궁민수" readonly v-model="member.email">
                    </th>
                  </tr>
                </thead>
              
                <tbody>
                  <tr>
                    <td class="password-cell">비밀번호</td>
                    <td>
                        <div class="form-floating">
                            <input v-model="member.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                          </div>
                    </td>
                  </tr>
              
                  <tr>
                    <td class="name-cell">이름</td>
                    <td>
                        <div class="form-floating mb-3">
                            <input v-model="member.name" type="email" class="form-control" id="floatingInput" placeholder="홍길동">
                            <label for="floatingInput">Name</label>
                          </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="phone-cell">휴대폰 번호</td>
                    <td>
                        <div class="form-floating mb-3">
                            <input v-model="member.phoneNumber" type="email" class="form-control" id="floatingInput" placeholder="010-xxxx-xxxx">
                            <label for="floatingInput">Phone-number</label>
                          </div>
                    </td>
                  </tr>


                </tbody>
              </table>
              
              
              
            
            
        </div>


        <div class="btn">
            <button class="upload-btn" @click="update">회원정보수정</button>
            <button class="cancle-btn">취소</button>
        </div>
        

       






    </div>    
</template>
<script>
import MemberService from '@/services/auth/MemberService';
export default {
    data() {
      return {
          email:"Electrionc@naver.com",
        member:{
         password:"",
         name:"",
         phoneNumber:""
        }
      }
    },
    methods: {
      async getDetail(){
        try {
           let response = await MemberService.get(this.email);
           console.log(response.data);
           this.member = response.data;
        } catch (error) {
           console.log(error);
        }
      },

        async update(){
          try {
             let response 
             = await MemberService.update(this.member.email, this.member);
             console.log(response.data);
             this.$router.push("/mypage");
             alert("회원정보 수정완료.")
          } catch (error) {
            console.log(error);
          }
        }
    },
    mounted() {
      this.getDetail(this.$route.params.email);
    },
}
</script>
<style scoped>
    @import '@/assets/css/Mypage/MemberInfoView.css';
    
</style>