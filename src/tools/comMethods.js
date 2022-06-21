
import axios from 'axios'

// 默认导出，不能用结构赋值接收，命名之后，当做对象使用

export default {
  // 加载动画
  loading (delay) {
    this.loadingState = true
    setTimeout(() => {
      this.loadingState = false
    }, delay)
  },
  // 窗口移动功能
  move (e, element, m) {
    let startX = e.pageX; let startY = e.pageY
    let multiple = 1
    if (m) multiple = m
    // 绑定事件
    document.addEventListener('mousemove', test)
    document.addEventListener('mouseup', cancelMove)
    // 开始移动
    function test (e) {
      element.style.left = (e.pageX - startX) * multiple + element.offsetLeft + 'px'
      element.style.top = (e.pageY - startY) * multiple + element.offsetTop + 'px'
      startX = e.pageX
      startY = e.pageY
    }
    //  取消移动
    function cancelMove () {
      document.removeEventListener('mousemove', test)
    }
  },

  // 格式化播放次数
  playCountFormat (count) {
    return count.toString().length > 4
      ? (count / 10000).toFixed() + '万次'
      : count + '次'
  },

  // 格式化时间
  dateFormat (dataStr) {
    const time = new Date(dataStr)

    function timeAdd0 (str) {
      if (str < 10) {
        str = '0' + str
      }
      return str
    }
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    // const h = time.getHours()
    // const mm = time.getMinutes()
    // const s = time.getSeconds()
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
    // return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s)
  },

  // // 根据歌曲Id获得播放url
  async play (musicId) {
    const { data: res } = await axios.get('http://localhost:3000/song/url', {
      params: { id: musicId, br: 320000 }
    })
    return res.data[0].url
  },
  // 请求歌单详细信息
  async getSongList (id) {
    const { data: res } = await axios('http://localhost:3000/playlist/detail', {
      params: { id: id }
    })

    return res.playlist
  },
  // 根据标签请求歌单数据,offset 为页码数
  async getPlayListUser (tag, page) {
    const { data: res } = await axios('http://localhost:3000/top/playlist', {
      params: { cat: tag, limit: 50, offset: page }
    })

    return res
  },
  // 详细搜索结果含封面
  async getSearchResult (keywords, type, offset, limit) {
    const { data: res } = await axios('http://localhost:3000/cloudsearch', {
      params: { keywords: keywords, type: type, offset: offset, limit: limit }
    })

    return res
  },
  // 请求专辑信息
  async getAlbum (albumId) {
    const { data: res } = await axios('http://localhost:3000/album', {
      params: { id: albumId }
    })

    return res
  },

  // 请求MV信息

  async getMVInfo (vid) {
    const { data: res } = await axios('http://localhost:3000/mv/detail', {
      params: { mvid: vid }
    })

    return res
  },
  // 请求MVUrl
  async getMVUrl (vid) {
    const { data: res } = await axios('http://localhost:3000/mv/url', {
      params: { id: vid }
    })

    return res
  },
  // 请求Video信息
  async getVideoInfo (vid) {
    const { data: res } = await axios('http://localhost:3000/video/detail', {
      params: { id: vid }
    })

    return res
  },
  // 请求VideoUrl
  async getVideoUrl (vid) {
    const { data: res } = await axios('http://localhost:3000/video/url', {
      params: { id: vid }
    })

    return res
  },
  // 请求评论数据
  async getComments (type, id, limit, offset) {
    const { data: res } = await axios(`http://localhost:3000/comment/${type}`, {
      params: { id: id, limit: limit, offset: offset }
    })

    return res
  },
  // 请求热评
  async getHotComments (type, id, limit, offset) {
    const { data: res } = await axios('http://localhost:3000/comment/hot', {
      params: { type, id: id, limit: limit, offset: offset }
    })

    return res
  },
  // 发表评论
  async submitComment (t, type, id, content, commentId) {
    // t: 0 删除, 1 发送, 2 回复
    const { data: res } = await axios('http://localhost:3000/comment', {
      params: { t: t, type: type, id: id, content: content, commentId: commentId }
    })

    return res
  },
  // 请求歌词
  async getLyric (id) {
    const { data: res } = await axios('http://localhost:3000/lyric', {
      params: { id: id }
    })

    return res
  },
  // 请求歌曲评论
  async getSongsComment (id, limit) {
    const { data: res } = await axios('http://localhost:3000/comment/music', {
      params: { id: id, limit: limit }
    })

    return res
  }
  // async getSinger(SingerId) {
  //   const { data: res } = await axios('http://localhost:3000/album', {
  //     params: { id: SingerId }
  //   })

  //   return res
  // }

}
