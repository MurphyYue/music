# music
音乐webApp
词音乐webAPP项目能做到正常播放音乐以及云端音乐库的请求加载，但是没有做到真正的跨域。在进入播放页面的时候，原接口用的是https，需要用到跨域，但是在此项目里并没有成功利用jsonP解决次跨域问题，而是通过追加一次ajax请求做到的把之前页面的图片加载到本页面。
***