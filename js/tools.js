// 封装一个用于登录/注册的构造函数（类）
//定义一个全局的入口
window.pageTools = window.pageTools || {};

;
(function() {

    // 登录注册
    function Login(isLogin, selector, eventListener) {
        this.isLogin = isLogin //用来判断登录还是注册
        this.selector = $(selector || '') //获取节点
        this.init()
        this.eventListener = eventListener
    }
    //核心代码
    Login.prototype.init = function() {
            var isShow = this.isLogin ? 'none' : 'block'
            var buttonText = this.isLogin ? '登录' : '注册'
            this.dialog = $('<div class="dialog"> \
                            <button class="close-btn">&times;</button>\
                            <div class="input-box">\
                            <input type="text" placeholder="用户名">\
                            <input type="password" placeholder="密码">\
                            <input type="password" class="again-pwd" placeholder="确认密码">\
                            <button class="btn"></button>\
                        </div>\
                        </div>')
            this.selector.append(this.dialog);
            $('.again-pwd').css('display', isShow)
            $('.btn').html(buttonText)
            $('.close-btn').click(function() { //点击X时关闭弹窗
                this.dialog.remove() //删除节点
                this.dialog = null //垃圾回收机制让this没有指向
                this.eventListener()
            }.bind(this))
            $('.btn').click(function() { //点击登录或注册关闭弹出
                    this.dialog.remove() //删除节点
                    this.dialog = null //垃圾回收机制让this没有指向
                    this.eventListener()


                }.bind(this)) //重新指向Login




        }
        //导航栏文字
    function nav(select, datas, callback) {
        this.datas = datas || [] //传入的数据如果无数据就是个空数组
        this.width = 1200 //导航栏宽度
        this.superView = $(select || '') //传入的存放位置如果没有就是空字符
        this.callback = callback //传入的方法
        this.createView()

    }
    nav.prototype.createView = function() {
            var nav = $('<ul class="nav-list"></ul>') //创建导航栏的dom
            this.datas.forEach(function(info) {
                    var item = $('<li class="nav-item" style="width:' + this.width / this.datas.length + 'px">\
                            <a href="' + (location.search ? '.' + info.url : info.url) + '"><img class="icon" src="' + info.imageurl + '">\
                                <span>' + info.title + '</span>\
                            </a>\
                        </li>')
                    nav.append(item)
                }.bind(this)) //改变this的指向
            this.superView.append(nav) // 将结果渲染到前端
        }
        // 侧边栏
    function Category(el, data, callback) {
        this.el = $(el || '')
        this.data = data || []
        this.callback = callback
        this.createView()

    }
    Category.prototype.createView = function() {
            var _this = this
            var category_menu = $('<ul class="category_menu"></ul>')
            this.el.append(category_menu)
            this.data.forEach(function(item) {
                var category_menu_item = $('<li><a href="#">' + item.title + '</a></li>')
                category_menu.append(category_menu_item)
                category_menu_item.mouseenter(function(item) {
                    return function(e) {
                        e.preventDefault();
                        var category_sub_menu = $('<ul class="category-sub-menu"></ul>')
                        $(this).append(category_sub_menu)
                        category_sub_menu.css('width', category_sub_menu.css('width') != '20 rem' ? '20rem' : '0')
                        item.des.forEach(function(info) {
                            var sub_menu_item = $('<li ><a href="#">' + info.title + '<a/></li>')
                            category_sub_menu.append(sub_menu_item)
                        })
                    }

                }(item)).mouseleave(function() {
                    $('.category-sub-menu').remove()
                })
            })
        }
        // 商品
    function goods(el, data, callback) {
        this.el = $(el || '')
        this.data = data || []
        this.callback = callback
        this.createView()
    }
    goods.prototype.createView = function() {
        var goods_container = $('<ul class="goods"></ul>')
        this.el.append(goods_container)
        this.data.forEach(function(item) {
            // console.log(item);

            var goods_item = $('<li class="item">\
           <img class="addr" src="' + item.addr + '">\
                <h1 id="' + item.id + '" class="title">' + item.title + '</h1>\
            </li>')
            goods_container.append(goods_item)
                // 二级商品
            var goods = $('<ul class="goods-list"></ul>');
            goods_item.append(goods)
            item.des.forEach(function(info) {
                var goods_item = $('<li class="goods-item"><a href="view/goods_detailss.html?type=' + item.type + '&id=' + info.id + '"> \
                <img class="image" src="' + info.image + '" alt="' + info.name + '">\
                <p class="name">' + info.name + '</p>\
                <p class="price">￥' + info.price + '</p>\
                  <button class="btnBuy">抢购</button>\
                </a></li>')
                goods.append(goods_item)
            })
        })

    }

    function zoom(el, ball, datas) { //ball图层
        this.el = $(el || '')
        this.ball = $(ball || '')
        this.datas = datas || []


        this.createView(this.ball)




    }
    zoom.prototype.createView = function(ball) {
        var scaleView = $('<div class="zoom" style="background-image:url(' + ('.' + this.datas.image) + ')"><div/>')
        this.el.append(scaleView)
        this.el.mouseenter(function() {
            scaleView.css('display', 'block')

        }).mousemove(function(e) {
            // console.log(ball[0].offsetWidth);
            // console.log(e);
            var moveX = e.offsetX - ball[0].offsetWidth / 2
            var moveY = e.offsetY - ball[0].offsetHeight / 2
            console.log(moveX, moveY);

            ball.css({
                'display': 'block',
                'top': moveY + 'px',
                'left': moveX + 'px'

            })
            scaleView.css({ //没有大图的素材只能随便写写
                "background-position": (-e.offsetX + 100) + 'px ' + (-e.offsetY + 100) + 'px' //因为拿到的是小图所以两边加200px大图的话另外搞
            })

        }).mouseleave(function() {
            scaleView.css('display', 'none')
            ball.css('display', 'none')
        })
    }
    window.pageTools = {
        Login,
        nav,
        Category,
        goods,
        zoom,
    }
})()