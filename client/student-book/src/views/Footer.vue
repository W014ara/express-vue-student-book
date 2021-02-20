<template>
    <footer class="root-footer">
        <nav class="root-footer-wrapper">
            <div class="inner">
                <a href="https://github.com/W014ara/express-vue-student-book" target="_blank">
                    <img src="../assets/img/32454652.svg" alt="github" class="git">
                </a>
                <p>
                    Bezruk Vladislav 2021(c)
                </p>
            </div>
        </nav>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="scss" scoped>
    .root-footer{
        width:100%;
        .root-footer-wrapper{
            width:100%;
            display:flex;
            .inner{
                width:100%;
                margin-right: 1rem;
                margin-left: 1rem;
                display:flex;
                flex-direction: column;
                flex-wrap: nowrap;
                align-items: center;
                .git{
                    width:2rem;
                    height:2rem;
                }
                p{
                    margin-top: .5rem;
                    font-weight: 300;
                    font-size: .5rem;
                }
            }
        }
    }
</style>