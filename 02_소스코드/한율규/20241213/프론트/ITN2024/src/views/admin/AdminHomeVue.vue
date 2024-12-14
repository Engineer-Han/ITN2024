<template>



  <div>
    <h3>Welcome! Admin</h3>
    <hr />
    <br />
    <br />

    <h3>전체 주문 현황</h3>
    <table class="table">
      <thead>
        <tr class="table-secondary">
          <th scope="col"></th>
          <th scope="col">총 주문건수</th>
          <th scope="col">총 주문액</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>40</td>
          <td>2,623,600</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />

    <h3>최근 주문 내역</h3>
    <table class="table">
      <thead>
        <tr class="table-secondary">
          <th scope="col"></th>
          <th scope="col">주문번호</th>
          <th scope="col">주문자명(ID)</th>
          <th scope="col">전화번호</th>
          <th scope="col">Email</th>
          <th scope="col">결제방법</th>
          <th scope="col">총주문액</th>
          <th scope="col">주문일시</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>[주문번호]</td>
          <td>[이름]</td>
          <td>[전화번호]</td>
          <td>[Email]</td>
          <td>[결제방법]</td>
          <td>[총주문액]</td>
          <td>[주문일시]</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />

    <h3>최근 회원 가입</h3>
    <table class="table">
      <thead>
        <tr class="table-secondary">
          <th scope="col"></th>
          <th scope="col">이름</th>
          <th scope="col">ID</th>
          <th scope="col">전화번호</th>
          <th scope="col">Email</th>
          <th scope="col">Grade</th>
          <th scope="col">가입일시</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td>[이름]</td>
          <td>[ID]</td>
          <td>[전화번호]</td>
          <td>[Email]</td>
          <td>[Grade]</td>
          <td>[가입일시]</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
