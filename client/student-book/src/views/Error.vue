<template>
    <section class="root-error">
        <div class="inner">
            <p>Ошибка! Запрашиваемая страница не найдена!</p>
            <router-link to="/">Назад на главную</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: "Error"
}
</script>

<style lang="scss" scoped>
    .root-error{
        display:flex;
        flex-direction: column;
        align-items:center;
        margin-top: 4rem;
        flex-grow: 1;
        align-items:center;
        justify-content:center;
        .inner{
            display:flex;
            flex-direction: column;
            width:50%;
            color:white;
            font-family:Roboto;
            text-align: center;
            box-sizing: border-box;
            p{
                font-size: 3rem;
                font-style: bold;
            }
            a{
                margin-top: 2rem;
                font-size: 1.5rem;
                font-weight: 300;
                text-decoration: none;
                transition: .2s;
            }
            a:hover{
                color:red;
            }
        }
    }
</style>