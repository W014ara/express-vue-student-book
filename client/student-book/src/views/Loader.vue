<template>
  <div class="lds-facebook">
    <div class="container">
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
    </div>
    <p>Ожидаем ответа от сервера</p>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss" scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 12rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  p {
    color: white;
    font-family: Roboto;
    text-align: center;
    font-size: 1.5rem;
  }
  .container {
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    .content {
      display: inline-block;
      align-self: center;
      width: 0.5rem;
      background: #fff;
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
  }
}
.lds-facebook .content:nth-child(1) {
  animation-delay: -0.24s;
}
.lds-facebook .content:nth-child(2) {
  animation-delay: -0.12s;
}
.lds-facebook .content:nth-child(3) {
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    height: 64px;
  }
  50%,
  100% {
    height: 32px;
  }
}
</style>
