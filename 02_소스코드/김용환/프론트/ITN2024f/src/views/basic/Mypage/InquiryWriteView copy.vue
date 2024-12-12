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

        

        <div class="main">
           
            <h2>1:1 문의내역</h2>

            <table class="table buy-list mt-3">
                <thead>
                  <tr>
                    <td class="title-cell">제목</td>
                    <th>
                      <input class="form-control" type="text" placeholder="Default input"
                             v-model="inquiry.title"
                      >
                    </th>
                  </tr>
                </thead>
              
                <tbody>              
                  <tr>
                    <td class="body-cell">본문</td>
                    <td>
                                             <quill-editor
                        v-model:value="state.content" 
                        :options="state.editorOption" 
                        @change="onEditorChange($event)" 
                      ></quill-editor>
                      <div class="mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="20"
                                  v-model="inquiry.contents"  
                        >
                        </textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              
              
            
            
        </div>


        <div class="btn">
            <button class="upload-btn" @click="save">등록</button>
            <button class="delete-btn">
              <router-link to ='/inquiry'>취소</router-link>
              </button>
        </div>
        

       






    </div>  
</template>
<script>
import { reactive } from 'vue'
import InquiryService from '@/services/basic/InquiryService';
export default {
  name: 'App',
   setup() {
    const state = reactive({
      content: '',
      _content: '',
      editorOption: {
        placeholder: '내용을 입력해주세요...', // placeholder 설정
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
        // more options
      },
      disabled: false
    })

    const onEditorBlur = (quill) => {
      console.log('editor blur!', quill)
    }
    const onEditorFocus = (quill) => {
      console.log('editor focus!', quill)
    }
    const onEditorReady = (quill) => {
      console.log('editor ready!', quill)
    }
    const onEditorChange = ({ quill, html, text }) => {
      console.log('editor change!', quill, html, text)
      state._content = html
    }

    setTimeout(() => {
      state.disabled = true
    }, 2000)

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
  },
  props: { title: String },
  data() {
    return {
      inquiry : {
        title :"",
        contents : "",
        writer:"Electrionc@naver.com",
      },
    };
  },

    methods: {
      async save(){
        try {
          let response = await InquiryService.insert(this.inquiry)
          console.log(response.data);
          this.$router.push("/inquiry")
        } catch (error) {
          console.log(error)
        }
      },      
    },
    mounted() {
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
 @import '@/assets/css/Mypage/InquiryWriteView.css';
    
</style>