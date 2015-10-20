// 路径配置
        require.config({
            paths: {
                echarts: '../script/echarts-2.2.7/build/dist'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chartFlow')); 
                
                var option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['联通','电信']
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['15:49:35','15:49:40','15:49:45','15:49:50','15:49:55','15:50:00','15:50:05']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'联通110',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:[20, 25, 15, 10, 18, 26, 30]
                        },
                        {
                            name:'电信110',
                            type:'line',
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:[10, 15, 22, 20, 15, 23, 10]
                        }
                    ]
                };
                //modify name    
                option.legend.data=['联通110','电信120'];
                option.series[1].data=[15, 15, 22, 20, 15, 23, 10];
                option.series[1].name="电信120";
                alert("setData ok.");
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );

        require(
            [
                'echarts',
                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chartApPie')); 
                
                var option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:['严重问题','警告','正常']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true, 
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '50%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'AP',
                                type:'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:335, name:'严重问题'},
                                    {value:310, name:'警告'},
                                    {value:234, name:'正常'}
                                ]
                            }
                        ]
                    };
                    
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
        require(
            [
                'echarts',
                'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chartApLine')); 
                
                var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['严重问题','警告','正常']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : ['12:00','12:30','13:00','13:30','14:00','14:30','15:00']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLabel : {
                                    formatter: '{value} '
                                }
                            }
                        ],
                        series : [
                            {
                                name:'严重问题',
                                type:'line',
                                data:[100, 200, 150, 130, 250, 220, 80]
                            },
                            {
                                name:'警告',
                                type:'line',
                                data:[200, 100, 250, 230, 150, 220, 180]
                            },
                            {
                                name:'正常',
                                type:'line',
                                data:[230, 30, 230, 20, 250, 50, 300]
                            }
                        ]
                    };
                    
                    
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );

        require(
            [
                'echarts',
                'echarts/chart/bar' 
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chartSSID')); 
                
                var option = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['2.4GHz', '5GHz']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: false},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                axisTick : {show: false},
                                data : ['SSID1','SSID2','SSID3','SSID4']
                            }
                        ],
                        series : [
                            {
                                name:'2.4GHz',
                                type:'bar',
                                itemStyle : { normal: {label : {show: true, position: 'inside'}}},
                                data:[200, 170, 240, 244, 200, 220, 210]
                            },
                            {
                                name:'5GHz',
                                type:'bar',
                                stack: '总量',
                                itemStyle: {normal: {
                                    label : {show: true, position: 'left'}
                                }},
                                data:[120, 132, 101, 34, 190, 230, 210]
                            }
                        ]
                    };
                    
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );

        require(
            [
                'echarts',
                'echarts/chart/pie' 
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('chartTerminal')); 
                
                var option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:['2.4GHz','5GHz']
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true, 
                                    type: ['pie', 'funnel']
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : false,
                        series : [
                            {
                                name:'所占份额',
                                type:'pie',
                                selectedMode: 'single',
                                radius : [0, 70],
                                
                                // for funnel
                                x: '20%',
                                width: '40%',
                                funnelAlign: 'right',
                                max: 1548,
                                
                                itemStyle : {
                                    normal : {
                                        label : {
                                            position : 'inner'
                                        },
                                        labelLine : {
                                            show : false
                                        }
                                    }
                                },
                                data:[
                                    {value:1014, name:'2.4GHz'},
                                    {value:1548, name:'5GHz'}
                                ]
                            },
                            {
                                name:'所占份额',
                                type:'pie',
                                radius : [100, 140],
                                
                                // for funnel
                                x: '60%',
                                width: '35%',
                                funnelAlign: 'left',
                                max: 1048,
                                
                                data:[
                                    {value:335, name:'802.11n'},
                                    {value:310, name:'802.11ac'},
                                    {value:369, name:'802.11b'},
                                    {value:1048, name:'802.11a'},
                                    {value:251, name:'802.11an'},
                                    {value:249, name:'802.11ac'}
                                ]
                            }
                        ]
                    };
                    var ecConfig = require('echarts/config');
                    myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param){
                        var selected = param.selected;
                        var serie;
                        var str = '当前选择： ';
                        for (var idx in selected) {
                            serie = option.series[idx];
                            for (var i = 0, l = serie.data.length; i < l; i++) {
                                if (selected[idx][i]) {
                                    str += '【系列' + idx + '】' + serie.name + ' : ' + 
                                           '【数据' + i + '】' + serie.data[i].name + ' ';
                                }
                            }
                        }
                        document.getElementById('wrong-message').innerHTML = str;
                    })
                    
                    
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );