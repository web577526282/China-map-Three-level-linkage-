//地图逻辑
var timeId = setInterval(function() {
	var windowWidth = $(window).width();
	if (windowWidth < 415) {
		$('.add101').show()
	} else {
		$('.add101').hide()
	}
}, 1000)
$(function() {
	let lengNumber=0
	let pageNumber=1
	var sizemap //根据屏幕宽度变化的地图大小
	var windowWidth = $(window).width();
	if (windowWidth < 767) {
		sizemap = 200
	} else {
		sizemap = 450
	}
	//地图变量
	var CityNumber = null //选中地级市的代码号
	var Country = 'cn' //国家默认参数
	var CityName = null //选中地级市的名字
	var mapName //将选中省份的名称转换为和JSON文件对应的名称
	var ProvincialNumber = null //选中省份的代码编号
	var ProvincialName = null //选中省份的名字
	var ProvincialNameOne = null //补全省份名字
	var mydata //选中地区的下级名称以及代码编号
	var nowcity = null //现在选中的城市
	var CountyNumber = null //县的代码编号
	var CountyName = null //选中的县的名字
    var propleNumberOne=null
	//控制选择表格变量
	var text = "地区注册用户统计" //选项名称
	var indexnum //选项ID属性
	var valueName = 1 //选项对应的编号
	if(windowWidth<767){
		valueName = 2
	}else{
		valueName = 1
	}
	var indexnumTo //选项对应ID类名
	var optionMap = {
		title: {
			text: '三级联动地图',
			subtext: '',
			x: 'center'
		},
		tooltip: {
			show: true,
			formatter(params) {
				var showdata = params.data[2] //打印相关数据
				var showdata1 = params.data[3]
				return `
						            <div>${showdata1}:<a style="color: #00E8D7">${showdata}</a></div>
						        `
			}
		},
		geo: [{ // 地图
			type: 'map',
			map: 'china', // 地区名字，重要参数
			itemStyle: {
				areaColor: "rgb(0,0,0)",
				borderColor: "#fff"
			},
			label: { // 标签的显示
				normal: { //静态
					show: true,
					textStyle: {
						color: '#fff',
						fontSize: 10
					}
				},
				emphasis: { //鼠标放上去后
					show: true,
					textStyle: {
						color: '#fff',
						fontSize: 16
					}
				}
			}
		}],
		//配置属性
		series: [{ // 散点分布
			roam: true,
			type: "scatter", // 显示精确分布点
			coordinateSystem: "geo",
			data: 0,
			blurSize: 20,
			symbolSize: 20,
			symbol: 'pin',
			minOpacity: 1,
			maxOpacity: 1,
		}]
	};
	//初始化echarts实例
	var myChart = echarts.init(document.getElementById('dt'));
	//使用制定的配置项和数据显示图表
	myChart.setOption(optionMap);

	//省级后退到国家
	$(".goback").on('click', function() {
		$("#map-Statistics4").hide()
		nowcity = '中国'
		Analogdata = []
		optionMap.series[0].data = [] //清空数据
		index = 0;
		$(this).css('display', 'none')
		optionMap.geo[0].map = 'china'
		optionMap.geo[0].layoutCenter = ''
		optionMap.series[0].data = Analogdata //当后退的时候要重新给目标地图填充数据
		myChart.setOption(optionMap, true);
		var addname = nowcity
		if (addname == null) {
			addname = "中国"
		}
		$(".active-map").find("h4").text(addname + "地区中扶天爱使用人数")
		ProvincialNumber = null
		ProvincialNameOne = null
		CountyNumber=null
		// CountryTabularData() //调用数据展示
	})
	//从所选地级市后退到所属省级
	//从所选地级市后退到所属省级
	//从所选地级市后退到所属省级
	//从所选地级市后退到所属省级

	$(".goback1").on('click', function() {
		$("#map-Statistics4").hide()
		Analogdata = []
		optionMap.series[0].data = [] //清空数据
		$(this).css('display', 'none')
		var paramsname = localStorage.getItem('name')
		index = 1
		$.ajax({
			url: "json/" + mapName + ".json",
			type: "GET",
			dataType: "json",
			success: res => {
				Analogdata = [] //重新定义数据
				mydata = []
				res.features.forEach(function(el, i, arr) {
					mydata.push({
						name: el.properties.name,
						value: el.id,
						id: el.id
					})
				})
				optionMap.geo[0] = {
					type: 'map',
					map: paramsname,
					layoutCenter: ['50%', '52%'],
					layoutSize: "60%",
					mapType: name,
					roam: false,
					itemStyle: {
						areaColor: "rgb(0,0,0)",
						borderColor: "#fff"
					},
					label: { // 标签的显示
						normal: { //静态
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: 10
							}
						},
						emphasis: { //鼠标放上去后
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: 16
							}
						}
					}
				};
				echarts.registerMap(paramsname, res)
				CityNumber = null
				CityName = null
				myChart.setOption(optionMap, true);
				nowcity = ProvincialNameOne
				var addname = nowcity
				if (addname == null) {
					addname = "中国"
				}
				$(".active-map").find("h4").text(addname + "地区中扶天爱使用人数")
				$(".goback").css('display', 'inline-block')
			}
		})


	})




	var index = 0
	myChart.on('click', function(params) {
		optionMap.series[0].data = [] //清理series中的数据,重新赋值数据
		if (index == 0) {
			//将所选省份名称与JSON文件名称对应，并拿到代码编号
			if (params.name == '江西') {
				mapName = 'jiangxi'
				ProvincialNumber = '360000'
				ProvincialNameOne = '江西省'
			} else if (params.name == '河南') {
				mapName = 'henan'
				ProvincialNumber = '410000'
				ProvincialNameOne = '河南省'
			} else if (params.name == '四川') {
				mapName = 'sichuan'
				ProvincialNumber = '510000'
				ProvincialNameOne = '四川省'
			} else if (params.name == '重庆') {
				mapName = 'chongqing'
				ProvincialNumber = '500000'
				ProvincialNameOne = '重庆市'
			} else if (params.name == '西藏') {
				mapName = 'xizang'
				ProvincialNumber = '540000'
				ProvincialNameOne = '西藏自治区'
			} else if (params.name == '贵州') {
				mapName = 'guizhou'
				ProvincialNumber = '520000'
				ProvincialNameOne = '贵州省'
			} else if (params.name == '辽宁') {
				mapName = 'liaoning'
				ProvincialNumber = '210000'
				ProvincialNameOne = '辽宁省'
			} else if (params.name == '新疆') {
				mapName = 'xinjiang'
				ProvincialNumber = '650000'
				ProvincialNameOne = '新疆维吾尔自治区'
			} else if (params.name == '山东') {
				mapName = 'shandong'
				ProvincialNumber = '370000'
				ProvincialNameOne = '山东省'
			} else if (params.name == '上海') {
				mapName = 'shanghai'
				ProvincialNumber = '310000'
				ProvincialNameOne = '上海市'
			} else if (params.name == '澳门') {
				mapName = 'aomen'
				ProvincialNumber = '820000'
			} else if (params.name == '山西') {
				mapName = 'shanxi'
				ProvincialNumber = '140000'
				ProvincialNameOne = '澳门市'
			} else if (params.name == '浙江') {
				mapName = 'zhejiang'
				ProvincialNumber = '330000'
				ProvincialNameOne = '浙江省'
			} else if (params.name == '海南') {
				mapName = 'hainan'
				ProvincialNumber = '460000'
				ProvincialNameOne = '海南省'
			} else if (params.name == '福建') {
				mapName = 'fujian'
				ProvincialNumber = '350000'
				ProvincialNameOne = '福建省'
			} else if (params.name == '青海') {
				mapName = 'qinghai'
				ProvincialNumber = '630000'
				ProvincialNameOne = '青海省'
			} else if (params.name == '宁夏') {
				mapName = 'ningxia'
				ProvincialNumber = '640000'
				ProvincialNameOne = '宁夏回族自治区'
			} else if (params.name == '湖北') {
				mapName = 'hubei'
				ProvincialNumber = '420000'
				ProvincialNameOne = '湖北省'
			} else if (params.name == '甘肃') {
				mapName = 'gansu'
				ProvincialNumber = '620000'
				ProvincialNameOne = '甘肃省'
			} else if (params.name == '安徽') {
				mapName = 'anhui'
				ProvincialNumber = '340000'
				ProvincialNameOne = '安徽省'
			} else if (params.name == '台湾') {
				mapName = 'taiwan'
				ProvincialNumber = '830000'
				ProvincialNameOne = '台湾省'
			} else if (params.name == '陕西') {
				mapName = 'shanxi1'
				ProvincialNumber = '610000'
				ProvincialNameOne = '陕西省'
			} else if (params.name == '广西') {
				mapName = 'guangxi'
				ProvincialNumber = '450000'
				ProvincialNameOne = '广西壮族自治区'
			} else if (params.name == '天津') {
				mapName = 'tianjin'
				ProvincialNumber = '120000'
				ProvincialNameOne = '天津市'
			} else if (params.name == '云南') {
				mapName = 'yunnan'
				ProvincialNumber = '530000'
				ProvincialNameOne = '云南省'
			} else if (params.name == '黑龙江') {
				mapName = 'heilongjiang'
				ProvincialNumber = '230000'
				ProvincialNameOne = '黑龙江省'
			} else if (params.name == '广东') {
				mapName = 'guangdong'
				ProvincialNumber = '440000'
				ProvincialNameOne = '广东省'
			} else if (params.name == '湖南') {
				mapName = 'hunan'
				ProvincialNumber = '430000'
				ProvincialNameOne = '湖南省'
			} else if (params.name == '河北') {
				mapName = 'hebei'
				ProvincialNumber = '130000'
			} else if (params.name == '内蒙古') {
				mapName = 'neimenggu'
				ProvincialNumber = '150000'
				ProvincialNameOne = '内蒙古自治区'
			} else if (params.name == '吉林') {
				mapName = 'jilin'
				ProvincialNumber = '220000'
				ProvincialNameOne = '吉林省'
			} else if (params.name == '江苏') {
				mapName = 'jiangsu'
				ProvincialNumber = '320000'
				ProvincialNameOne = '江苏省'
			} else if (params.name == '北京') {
				mapName = 'beijing'
				ProvincialNumber = '110000'
				ProvincialNameOne = '北京市'
			} else if (params.name == '香港') {
				mapName = 'xianggang'
				ProvincialNumber = '810000'
				ProvincialNameOne = '香港市'
			} else {
				return null
			}
			ProvincialName = params.name
			//请求所选省份的JSON文件，绘制地图
			$.ajax({
				url: "json/" + mapName + ".json",
				type: "GET",
				dataType: "json",
				success: res => {
					mydata = []
					res.features.forEach(function(el, i, arr) {
						mydata.push({
							name: el.properties.name,
							value: el.id,
							id: el.id
						})
					})
					optionMap.geo[0] = {
						type: 'map',
						map: params.name,
						layoutCenter: ['50%', '49%'],
						layoutSize: "55%",
						mapType: name,
						roam: false,
						itemStyle: {
							areaColor: "rgb(0,0,0)",
							borderColor: "#fff"
						},
						label: { // 标签的显示
							normal: { //静态
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 10
								}
							},
							emphasis: { //鼠标放上去后
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 16
								}
							}
						}
					};
					echarts.registerMap(params.name, res)
					myChart.setOption(optionMap, true);
					nowcity = params.name
					index++
					$(".goback").css('display', 'inline-block')
				}
			})
		} else if (index == 1) {
			//市后退到省的按钮显示，并隐藏省级退到全国的按钮
			//市后退到省的按钮显示，并隐藏省级退到全国的按钮
			//市后退到省的按钮显示，并隐藏省级退到全国的按钮
			if (nowcity != "北京" && nowcity != "天津" && nowcity != "上海" && nowcity != "重庆") { //判断是否是直辖市
				$(".goback").css('display', 'none')
				$(".goback1").css('display', 'inline-block')
			}
			localStorage.setItem('name', params.name)
			mydata.forEach(function(el, i, arr) {
				if (el.name == params.name) {
					CityNumber = el.id //获取该市的代码编号
				}
			})
			CityName = params.name
			if (CityNumber == '' || CityNumber == undefined) {
				$(".goback").css('display', 'inline-block')
				$(".goback1").css('display', 'none')
				return
			}
			//请求该市的本地JSON数据，绘制地图
			$.ajax({
				url: "json/" + CityNumber + ".json",
				type: "GET",
				dataType: "json",
				success: res => {
					//此处需要请求后台数据，用CityNumber为参数来获取该地区下的用户数据
					//此处需要请求后台数据，用CityNumber为参数来获取该地区下的用户数据
					//此处需要请求后台数据，用CityNumber为参数来获取该地区下的用户数据
					mydata = []
					res.features.forEach(function(el, i, arr) {
						mydata.push({
							name: el.properties.name,
							value: el.id,
							id: el.id
						})
					})
					nowcity = params.name
					optionMap.geo[0] = {
						type: 'map',
						map: params.name,
						layoutCenter: ['50%', '49%'],
						layoutSize: "65%",
						mapType: name,
						roam: false,
						itemStyle: {
							areaColor: "rgb(0,0,0)",
							borderColor: "#fff"
						},
						label: { // 标签的显示
							normal: {
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 10
								}
							}
						},
						data: mydata
					};
					echarts.registerMap(params.name, res)
					myChart.setOption(optionMap, true);
					index++
				}
			})
		} else if (index == 2) {
			var Width = $(window).width();
			if(params.name==''){
			}else{
				if (Width > 415 && Width<750) {
					$(".admin-table").show()
					$("#map-Statistics4").hide()
				} else {
					$(".admin-table").hide()
				}
				$(window).resize(function() {
					console.log(index)
					if (index == 2) {
						let Width1 = $(window).width();
						if (Width1 > 415 && Width1< 740) {
							$(".admin-table").show()
							$("#map-Statistics4").hide()
						} else {
							$(".admin-table").hide()
							$("#map-Statistics4").show()
						}
					}
				})
			}
		}
	})




})
