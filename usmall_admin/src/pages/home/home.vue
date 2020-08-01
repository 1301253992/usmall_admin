<template>
<div id="main">
    
</div>
</template>
<script>
import echarts from 'echarts'
export default {
components:{},
data(){
return {
}
},
methods:{},
mounted(){
     // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
             };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
},
}
</script>
<style scoped>
#main{
    width: 90%;
    height: 600px;
    margin: 20px auto;

}
</style>