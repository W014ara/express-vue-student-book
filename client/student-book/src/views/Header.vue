<template>
  <header class="root-header">
    <nav class="header-nav">
      <div class="header-nav-wrapper">
        <router-link class="inner" to="/">
          Данные по студентам
        </router-link>
        <router-link class="inner" to="/students">
          Данные по экзаменам/зачетам
        </router-link>
        <router-link class="inner" to="/fails">
          Пересдачи
        </router-link>
        <router-link class="inner" to="/editgroup">
          Редактирование студента
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.root-header {
  position: fixed;
  width: 100%;
  height: 4rem;
  background: #24022d;
  h1 {
    font-size: 1rem;
  }
  .header-nav {
    position: relative;
    width: inherit;
    display: flex;
    height: 3.5rem;
    margin-top: 1rem;
    margin-left: 2rem;
    .header-nav-wrapper {
      display: flex;
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
      :nth-child(1) {
        width: 9.5rem;
        height: 2rem;
      }
      :nth-child(2) {
        width: 15rem;
        height: 2rem;
      }
      :nth-child(3) {
        width: 8.5rem;
        height: 2rem;
      }
      :nth-child(4) {
        width: 11rem;
        height: 2rem;
      }
      .inner {
        background: #24022d;
        border-radius: 0.5rem;
        color: white;
        text-align: center;
        font-size: 0.85rem;
        padding-top: 0.5rem;
        box-sizing: border-box;
        text-decoration: none;
        transition: 0.2s;
        &:hover {
          cursor: pointer;
          background: #ffffff;
          box-shadow: 0rem 0.3rem 1.2rem rgba(255, 255, 255, 0.5);
          color: #55036a;
        }
      }
    }
  }
}
</style>
