;
(function() {
    var qiehuan = null
    if (location.search) {
        qiehuan = '../res/data/data.json' //防止页面跳转找不到数据
    } else {
        qiehuan = './res/data/data.json'
    }
    // console.log(qiehuan);

    function Page(url) {
        if (location.search) { //location.search会回去页面跳转所带的数据
            var urlStr = location.search.replace('?', '')
            var temp = urlStr.split('&')
            var type = temp[0].replace('type=', '')
            var id = temp[1].replace('id=', '')

            this.loadData(url).then(function(res) {
                    var goodsDetails = res.goods[type].des[id]
                    console.log(goodsDetails)
                        // console.log(res);
                    this.loginRegister() //登录部分
                    this.nav(res.nav) //导航栏文字
                    this.banner() //轮播图
                    this.categoryNav(res.category) //侧边栏
                    this.goodInfo(goodsDetails)
                    this.zoom(goodsDetails) //放大镜

                }.bind(this)) //bind让this指向Page不然会报错
        } else {
            this.loadData(url).then(function(res) {
                // console.log(res);
                this.init(res)
            }.bind(this))
        }


    }
    Page.prototype.loadData = function(url) {
            return new Promise(function(success, fail) {
                $.ajax({
                    type: 'get',
                    url: url
                }).then(function(res) {
                    success(res)
                })
            })
        }
        // 初始项目
    Page.prototype.init = function(data) {
        // 登录界面
        this.loginRegister()
            // 导航条
        this.nav(data.nav)
            // 轮播图
        this.banner()
            // 侧边栏
        this.categoryNav(data.category)
            // 商品
        this.goods(data.goods)
            // 左侧定位栏
        this.location(data.goods)
            //右侧qq客服处
        this.addRightBar()
    }
    var loginView = null //对话框DOM
        //对话框
    function loginRegisterAction(event) {

        event.preventDefault ? event.preventDefault() : event.returnValue = false

        if (!loginView) {
            var type = event.target.dataset.type;
            console.log(type);

            loginView = new pageTools.Login(type == 'login', 'body', function() {
                loginView = null
            })
        }
    }

    Page.prototype.loginRegister = function() {
            $('.login').click(loginRegisterAction)
            $('.register').click(loginRegisterAction)
        }
        //导航栏样式



    Page.prototype.nav = function(navlist) {
        new pageTools.nav('.nav_container', navlist, function() {
            console.log('您单击了');

        })
    }

    Page.prototype.banner = function() {
        new Swiper('.swiper', {

            loop: true, // 循环模式选项
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            // 如果需要分页器

            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
    }

    Page.prototype.categoryNav = function(category) {
        new pageTools.Category('.category-nav', category, function(res) {
            console.log(res);
        })
    }

    Page.prototype.goods = function(goods) {
        new pageTools.goods('.main-container', goods, function() {

        })
    }
    Page.prototype.goodInfo = function(info) {
        $('<img src="' + (location.search ? '.' + info.image : info.image) + '">').appendTo('.goods-img')
        $('.title').html(info.title)
        $('.price').html(info.price)
    }
    Page.prototype.zoom = function(img) {
            new pageTools.zoom('.goods-img', '.ball', img)
        }
        //左侧快速定位
    Page.prototype.location = function(res) {

        var leftbar = $('<ul class="locationBar"></ul>')
        res.forEach(function(item, index) {
            var barli = $('<li><a href="#' + item.id + '">' + item.title + '</a></li>')
            leftbar.append(barli)
        })
        $(document.body).append(leftbar)


    }
    Page.prototype.addRightBar = function() {
        var rightbar = $('<ul class="rightbar"></ul>')
        data = ['客服', '回到顶部']
        data.forEach(function(item, index) {
            if (item === '客服') {
                rightbar.append($('<li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2453164592&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2453164592:52" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></li>'))
            } else {
                var Top = $('<li><a>回到顶部<a/></li>')
                var clientHeight = document.documentElement.clientHeight
                console.log(clientHeight);

                window.onscroll = function() {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    if (scrollTop >= clientHeight) {

                        $('.locationBar').css({
                            'display': 'block'
                        })
                        $('.rightbar').css({
                            'display': 'block'
                        })

                    } else {
                        $('.locationBar').css({
                            'display': 'none'
                        })
                        $('.rightbar').css({
                            'display': 'none'
                        })
                    }
                }
                Top.click(function(e) {
                    e.preventDefault()
                    $('html,body').animate({
                        scrollTop: 0
                    }, 1000)
                })

                rightbar.append(Top)
            }
        })
        $(document.body).append(rightbar)

    }

    function main() {
        new Page(qiehuan)
    }
    main()




















})()