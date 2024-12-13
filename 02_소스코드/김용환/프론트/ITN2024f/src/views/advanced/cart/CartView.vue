// views/advanced/gallery/GalleryView.vue // vueInit // 디자인 및 변수/함수
형태만 코딩
<template>
  <div>
    <div class="text-center">
      <h1>장바구니</h1>
      
    </div>
    <div class="cart-wrapper">
      
      <div class="cart-container">
        <!-- 전체선택 -->
        <div class="form-check">
    <input class="form-check-input" type="checkbox" id="selectAll" 
           :checked="allSelected" @change="toggleSelectAll" />
    <label class="form-check-label" for="selectAll">전체 선택/해제</label>
  </div>
        <div>
          <div v-for="(data, index) in carties" :key="index">
            <table class="table">
              <thead class="table-secondary">
                <tr>
                  <th scope="col">일반상품</th>
                </tr>
              </thead>
            </table>
            
            <!-- 체크박스 -->
            <div class="cart-item">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :value="data.caid" v-model="selectedItems"
                  :id="'flexCheckDefault' + index" />
                <label class="form-check-label" :for="'flexCheckDefault' + index"></label>
              </div>
              <img :src="data.fileUrl" alt="상품 이미지" />
              <div class="item-details">
                <h5>{{ data.name }}</h5>
                <p>{{ data.price }}원</p>
              </div>
              
            </div>

            <div class="size">
              <div class="size-item">
                <table class="table">
                  <thead class="table-secondary">
                    <tr>
                      <th scope="col">{{data.siid}}사이즈옵션</th>
                    </tr>
                  </thead>
                </table>
                
                
                <!-- 사이즈옵션번호 -->
                <div class="quantity">
                  <!-- 증가 버튼 -->
                  <button class="increase" @click="updateQuantity(index, 1)">+</button>

                  <!-- 수량 입력 (readonly 상태) -->
                  <input type="number" :value="data.quantity" min="1" readonly />

                  <!-- 감소 버튼 -->
                  <button class="decrease" @click="updateQuantity(index, -1)">−</button>
                </div>

                <div class="summary-item">
                  <span></span>
                  <span>주문금액&nbsp;&nbsp; {{ data.orderAmount }}원</span> <!-- 주문 금액 표시 -->
                </div>

                <div class="edit">
                  
                  <button class="remove-btn" type="button" @click="remove(data.caid)">
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>




          <hr />

          <button class="btn btn-outline-dark me-3" type="button" @click="removeSelected">
            선택 삭제
          </button>
          <button class="btn btn-outline-dark" type="button" @click="removeAll">
            전체 삭제
          </button>
        </div>
      </div>

      <div class="summary-container">
        <h2>결제 요약</h2>
        <div class="summary-item">
          <span>상품 금액:</span>
          <span id="product-total">{{ productTotal }}원</span>
        </div>
        <div class="summary-item">
          <span>배송비:</span>
          <span id="shipping-cost">{{ shippingCost }}원</span>
        </div>
        <div class="summary-item total">
          <span>총 결제 금액:</span>
          <span id="total-amount">{{ totalAmount }}원</span>
        </div>
        <br />
        <button id="order" class="btn btn-outline-dark" @click="orderAll">전체상품주문</button>
        <br />
        <br />
        <button id="order" class="btn btn-outline-dark" @click="orderSelected">선택상품주문</button>
      </div>
    </div>
  </div>
</template>
<script>

import CartService from "@/services/advanced/CartService";
export default {
  data() {
    return {
      allSelected: false, // 전체 선택 상태를 추적하는 프로퍼티
      cart: {
        caid: "",
        prid: "",
        siid: "",
        color: "",
        quantity: "",
        email: ""
      },

      pageIndex: 1,
      totalCount: 0,
      recodeCountPerPage: 3,
      searchKeyword: "",
      carties: [], // 빈배열
      selectedItems: [], // 선택된 상품 ID들
      // 사이즈옵션번호
      quantity: this.initialQuantity,
      productTotal: 0, // 상품 총 금액
      shippingCost: 3000, // 배송비
      totalAmount: 0 // 총 결제 금액  
      
    };
  },

  methods: {


  //  전체선택 하는 함수
toggleSelectAll(event) {
    this.allSelected = event.target.checked; // 전체 선택 체크박스 상태 업데이트
    
   
if (this.allSelected) {
      // 전체 선택
      this.selectedItems = this.carties.map(item => item.caid); // 모든 항목 ID 추가
    } 
   
else {
      
     
// 전체 해제
      this.selectedItems = []; // 선택 항목 초기화
    }
  },
 



    copyObj(obj) {
      const result = {};

      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          result[key] = this.copyObj(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }

      return result;
    },

    //  선택삭제
    async removeSelected() {
      try {
        const promises = this.selectedItems.map((caid) =>
          CartService.remove(caid)
        );
        await Promise.all(promises); // 모든 삭제 요청을 병렬로 처리
        this.selectedItems = []; // 선택 항목 초기화
        this.getCart(); // 데이터 다시 로드
      } catch (error) {
        console.error("선택 삭제 오류:", error);
      }
    },

    // 전체 삭제
    async removeAll() {
      try {
        const promises = this.carties.map((item) =>
          CartService.remove(item.caid)
        );
        await Promise.all(promises);
        this.carties = [];
        this.selectedItems = [];
      } catch (error) {
        console.error("전체 삭제 오류:", error);
      }
    },

    // Other methods...

  calculateSummary() {
    // Calculate the total amount only for selected items
    this.productTotal = this.carties
      .filter(item => this.selectedItems.includes(item.caid)) // Filter selected items
      .reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price

    // Calculate the total amount with shipping cost
    this.totalAmount = this.productTotal + this.shippingCost;
  },
    // calculateSummary() {
    //   // 모든 상품의 금액 합계 계산
    //   this.productTotal = this.carties.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0
    //   );

    //   // 총 결제 금액 계산
    //   this.totalAmount = this.productTotal + this.shippingCost;
    // },
    async getCart() {
      try {
        let response = await CartService.getAll(
          this.searchKeyword,
          this.pageIndex - 1,
          this.recodeCountPerPage
        );

        const { results, totalCount } = response.data;
        console.log(response.data); // 디버깅
        this.carties = results;
        this.totalCount = totalCount;


        // 주문금액 계산
        this.carties = results.map(item => ({
          ...item,
          orderAmount: item.price * item.quantity // 초기 주문금액 계산
        }));


        // 데이터 로드 후 요약 정보 업데이트
        this.calculateSummary();
      } catch (error) {
        console.log(error);
      }
    },

    // 수정
    async update(caid,data) {
      try {
        
        let response = await CartService.update(caid,data);
        console.log(response.data);  // 디버깅
        // this.$router.push("/cart");
        // this.$router.go(0);   // 전체조회 강제이동: /dept
        this.getCart();
      } catch (error) {
        //this.cart.image = undefined;
        console.log(error);
      }
    },
    // 삭제
    async remove(caid) {
      try {

        let response = await CartService.remove(caid);
        console.log(response.data);
        // this.$router.push("/cart"); //
        this.$router.go(0);            // 새로고침
      } catch (error) {
        console.log(error);
      }
    },


    // 수량 업데이트
    updateQuantity(index, change) {
      const cartItem = this.carties[index];
      const newQuantity = cartItem.quantity + change;

      if (newQuantity >= 1) {
        this.carties[index].quantity = newQuantity;
        //this.calculateSummary();
        let clone = this.copyObj(this.carties[index]);
        delete clone.orderAmount;
        delete clone.price;
        delete clone.gender;
        delete clone.name;
        delete clone.fileUrl;
        //alert(clone.caid);
        alert(JSON.stringify(clone));
        this.update(clone.caid,clone);
       
      }
    },
      //const newQuantity = cartItem.quantity + change;

      // if (newQuantity >= 1) {
      //   this.$set(this.carties, index, {
      //     cartItem,
      //     quantity: newQuantity,
      //   });
      //    // 요약 정보 업데이트
      //   this.calculateSummary();
      // }
    


    // 상품주문 

 // 선택된 상품 주문하기
//  orderSelected() {
//     if (this.selectedItems.length === 0) {
//       alert("선택된 상품이 없습니다.");
//       return;
//     }
//     // 선택된 상품의 ID를 쿼리로 전달
//     this.$router.push({
//       name: "OrderView",
//       query: { items: this.selectedItems.join(",") },
//     });
//   },

//   // 모든 상품 주문하기
//   orderAll() {
//     if (this.carties.length === 0) {
//       alert("장바구니가 비어 있습니다.");
//       return;
//     }
//     // 모든 상품의 ID를 쿼리로 전달
//     const allItems = this.carties.map((item) => item.caid);
//     this.$router.push({
//       name: "OrderView",
//       query: { items: allItems.join(",") },
//     });
//   },

  },

  mounted() {
    this.getCart(this.$route.params.caid);

  },

  // 사이즈옵션번호
  watch: {
  carties: {
    deep: true,
    handler() {
      this.calculateSummary();
    },
  },
  selectedItems: {
    handler() {
      this.calculateSummary(); // Update summary when selected items change
    }
  }
},
  // watch: {
  //   carties: {
  //     deep: true,
  //     handler() {
  //       this.calculateSummary();
  //     },

  //   },
  // },

};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.cart-wrapper {
  display: flex;
  gap: 20px;
  width: 90%;
  max-width: 1200px;
}

.cart-container {
  flex: 2;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-container {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 900px;
}

h1,
h2 {
  color: #333;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  margin-left: 20px;
}

.item-details h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 120px;
  height: 40px;
}

.quantity button {
  width: 40px;
  height: 100%;
  border: none;
  background-color: #f0f0f0;
  color: #333;
  font-size: 18px;
  cursor: pointer;
}

.quantity button:hover {
  background-color: #ddd;
}

.quantity input {
  width: 40px;
  text-align: center;
  border: none;
  font-size: 16px;
  pointer-events: none;
  background-color: #fff;
}

.edit {
  display: flex;
  margin-left: 90%;
}

.remove-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.cart-actions {
  text-align: right;
  margin-top: 20px;
}

.cart-actions button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  font-weight: bold;
  font-size: 18px;
}

#checkout-btn {
  background-color: #27ae60;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

#checkout-btn:hover {
  background-color: #219150;
}

/* 상품주문  */
#order {
  width: 100%;
}
</style>
