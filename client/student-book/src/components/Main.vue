<template>
    <section class="root-main">
        <div class="inner">
            <table class="table_dark">
            <tr>
                <th>#</th>
                <th>ФИО</th>
                <th>ПРиС</th>
                <th>СИИ</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Семёнов Георгий Заалович</td>
                <td>5</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Крутяков Антон Викторович</td>
                <td>5</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Безрук Владислав Вячеславович</td>
                <td>5</td>
                <td>5</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Алиев Юнус Алиевич</td>
                <td>5</td>
                <td>5</td>
            </tr>
        </table>
        </div>

    </section>
</template>

<script>
export default {
    name: "Main"
}
</script>

<style lang="scss" scoped>
    $main_color:white;
    $border_color: #24022D;
    $hover_color: #24022d5d;
    .root-main {
        display:flex;
        align-items:center;
        margin-top: 4rem;
        flex-grow: 1;
        h1{
            font-size:1rem;
        }
        .inner{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: center;
            .table_dark {
                font-family: Roboto;
                font-size: 1.2rem;
                width: 100%;
                text-align: left;
                border-collapse: collapse;
                border-radius: .3rem;
                background: $main_color;
            }
            .table_dark th {
                color: $border_color;
                border-bottom: .05rem solid $border_color;
                padding: .5rem .5rem;
                transition:.2s;
                &:hover{
                    background:$hover_color;
                    color:white;
                }
            }
            .table_dark td {
                color: $border_color;
                border-bottom: .05rem solid $border_color;
                border-right:  .05rem solid $border_color;
                padding: .5rem .5rem;
                transition:.2s;
                text-decoration: none;
                &:hover{
                    background:$hover_color;
                    color:white;
                }
            }
            .table_dark tr:last-child td {
                border-bottom: none;
            }
            .table_dark td:last-child {
                border-right: none;
            }
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>