/* eslint-disable camelcase */

// 增加邮件输入框
function Addemail (type) {
  // 直接用一个v-model就行赋值为空就行
  if (type === 'edit_theme') {
    this.emailsinput_edit_theme.push({model: ''})
    this.display_edit_theme = 'none'
    this.bt_dis_for_edtztsub = true
  } else if (type === 'add_theme') {
    this.display_add_theme = 'none'
    this.emailsinput.push({model: ''})
    this.bt_dis_for_addztsub = true
  } else if (type === 'add_word') {
    this.display_add_word = 'none'
    this.emailsinput_word.push({model: ''})
    this.bt_dis_for_addfcsub = true
  } else if (type === 'edit_word') {
    this.emailsinput_edit_word.push({model: ''})
    this.display_edit_word = 'none'
    this.bt_dis_for_edtfcsub = true
  } else if (type === 'add_url') {
    this.emailsinput_url.push({model: ''})
    this.display_add_url = 'none'
    this.bt_dis_for_adddtsub = true
  } else if (type === 'edit_url') {
    this.emailsinput_edit_url.push({model: ''})
    this.display_edit_url = 'none'
    this.bt_dis_for_edtdtsub = true
  } else if (type === 'add_word_url') {
    this.url_inputs_word.push({model: ''})
    this.display_add_word_url = 'none'
    this.bt_dis_for_addfcsub = true
  } else if (type === 'edit_word_url') {
    this.url_edit_word.push({model: ''})
    this.display_edit_word_url = 'none'
    this.bt_dis_for_edtfcsub = true
  }
}

// 核对重复
function Checkrepeat (input) {
  var hash = {}
  var length = input.length
  for (var i = 0; i < length; i++) {
    if (hash[input[i].model]) {
      return false
    }
    hash[input[i].model] = true
  }
  return true
}

// 核对邮箱
function CheckEamil (type, value) {
  var if_check_right = true
  var r = /([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+.([A-Za-z]{2,4})/g
  // eslint-disable-next-line no-useless-escape
  var r_wz = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+/g
  if (type === 'add_theme') {
    if (Checkrepeat(this.emailsinput)) {
      for (var i = 0; i < this.emailsinput.length; i++) {
        var iftrue = r.test(this.emailsinput[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if (if_check_right && r.test(value)) {
        this.display_add_theme = ''
        this.bt_dis_for_addztsub = false
      } else {
        this.display_add_theme = 'none'
        this.bt_dis_for_addztsub = true
      }
    } else {
      this.$message.error('邮箱重复')
      this.bt_dis_for_addztsub = true
      this.display_add_theme = 'none'
    }
  } else if (type === 'edit_theme') {
    if (Checkrepeat(this.emailsinput_edit_theme)) {
      for (i = 0; i < this.emailsinput_edit_theme.length; i++) {
        iftrue = r.test(this.emailsinput_edit_theme[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if (if_check_right && r.test(value)) {
        this.display_edit_theme = ''
        this.bt_dis_for_edtztsub = false
      } else {
        this.display_edit_theme = 'none'
        this.bt_dis_for_edtztsub = true
      }
    } else {
      this.display_edit_theme = 'none'
      this.bt_dis_for_edtztsub = true
      this.$message.error('邮箱重复')
    }
  } else if (type === 'add_word') {
    if (Checkrepeat(this.emailsinput_word)) {
      if (this.url_inputs_word.length === 1) {
        var if_check_right_url = r_wz.test(this.url_inputs_word[0].model)
        r_wz.lastIndex = 0
      } else {
        if_check_right_url = false
      }
      for (i = 0; i < this.emailsinput_word.length; i++) {
        iftrue = r.test(this.emailsinput_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_inputs_word.length; i++) {
        iftrue = r_wz.test(this.url_inputs_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      var if_true = r.test(value)
      r.lastIndex = 0
      if (if_check_right && if_true && if_check_right_url) {
        this.display_add_word = ''
        this.bt_dis_for_addfcsub = false
      } else if (if_check_right && if_true) {
        this.display_add_word = ''
      } else {
        this.display_add_word = 'none'
      }
    } else {
      this.display_add_word = 'none'
      this.bt_dis_for_addfcsub = true
      this.$message.error('邮箱重复')
    }
  } else if (type === 'add_word_url') {
    if (Checkrepeat(this.url_inputs_word)) {
      if_check_right_url = true
      if (this.emailsinput_word.length === 1) {
        if_check_right = r.test(this.emailsinput_word[0].model)
        r.lastIndex = 0
      } else {
        if_check_right = true
      }
      for (i = 0; i < this.emailsinput_word.length; i++) {
        iftrue = r.test(this.emailsinput_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_inputs_word.length; i++) {
        iftrue = r_wz.test(this.url_inputs_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if_true = r_wz.test(value)
      r.lastIndex = 0
      if (if_check_right && if_true && if_check_right_url) {
        this.display_add_word_url = ''
        this.bt_dis_for_addfcsub = false
      } else if (if_check_right_url && if_true) {
        this.display_add_word_url = ''
      } else {
        this.display_add_word_url = 'none'
      }
    } else {
      this.display_add_word_url = 'none'
      this.bt_dis_for_addfcsub = true
      this.$message.error('网址重复')
    }
  } else if (type === 'edit_word') {
    if (Checkrepeat(this.emailsinput_edit_word)) {
      if (this.url_edit_word.length === 1) {
        if_check_right_url = r_wz.test(this.url_edit_word[0].model)
        r_wz.lastIndex = 0
      } else {
        if_check_right_url = false
      }
      for (i = 0; i < this.emailsinput_edit_word.length; i++) {
        iftrue = r.test(this.emailsinput_edit_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_edit_word.length; i++) {
        iftrue = r_wz.test(this.url_edit_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if_true = r.test(value)
      r.lastIndex = 0
      if (if_check_right && if_true && if_check_right_url) {
        this.display_edit_word = ''
        this.bt_dis_for_edtfcsub = false
      } else if (if_check_right && if_true) {
        this.display_edit_word = ''
      } else {
        this.display_edit_word = 'none'
      }
    } else {
      this.display_edit_word = 'none'
      this.bt_dis_for_edtfcsub = true
      this.$message.error('邮箱重复')
    }
  } else if (type === 'edit_word_url') {
    if (Checkrepeat(this.url_edit_word)) {
      if (this.emailsinput_edit_word.length === 1) {
        if_check_right_url = r.test(this.emailsinput_edit_word[0].model)
        r.lastIndex = 0
      } else {
        if_check_right_url = false
      }
      for (i = 0; i < this.emailsinput_edit_word.length; i++) {
        iftrue = r.test(this.emailsinput_edit_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_edit_word.length; i++) {
        iftrue = r_wz.test(this.url_edit_word[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if_true = r_wz.test(value)
      r_wz.lastIndex = 0
      if (if_check_right && if_true && if_check_right_url) {
        this.display_edit_word_url = ''
        this.bt_dis_for_edtfcsub = false
      } else if (if_check_right && if_true) {
        this.display_edit_word_url = ''
      } else {
        this.display_edit_word_url = 'none'
      }
    } else {
      this.display_edit_word_url = 'none'
      this.bt_dis_for_edtfcsub = true
      this.$message.error('网址重复')
    }
  } else if (type === 'add_url') {
    if (Checkrepeat(this.emailsinput_url)) {
      var if_true_url = r_wz.test(this.UrlSub.url)
      r_wz.lastIndex = 0
      for (i = 0; i < this.emailsinput_url.length; i++) {
        iftrue = r.test(this.emailsinput_url[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      var is_true = r.test(value)
      r.lastIndex = 0
      if (if_check_right && is_true && if_true_url) {
        this.display_add_url = ''
        this.bt_dis_for_adddtsub = false
      } else if (if_check_right && is_true) {
        this.display_add_url = ''
      } else {
        this.display_add_url = 'none'
        this.bt_dis_for_adddtsub = true
      }
    } else {
      this.display_add_url = 'none'
      this.bt_dis_for_adddtsub = true
      this.$message.error('邮箱重复')
    }
  } else if (type === 'edit_url') {
    if (Checkrepeat(this.emailsinput_edit_url)) {
      if_true_url = r_wz.test(this.UrlSubE.url)
      r_wz.lastIndex = 0
      for (i = 0; i < this.emailsinput_edit_url.length; i++) {
        iftrue = r.test(this.emailsinput_edit_url[i].model)
        // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if (if_check_right && r.test(value) && if_true_url) {
        this.display_edit_url = ''
        this.bt_dis_for_edtdtsub = false
      } else if (if_check_right && r.test(value)) {
        this.display_edit_url = ''
      } else {
        this.display_edit_url = 'none'
        this.bt_dis_for_edtdtsub = true
      }
    } else {
      this.display_edit_url = 'none'
      this.bt_dis_for_edtdtsub = true
      this.$message.error('邮箱重复')
    }
  } else if (type === 'edit_url_url') {
    if_true_url = r_wz.test(this.UrlSubE.url)
    r_wz.lastIndex = 0
    if_check_right = false
    for (i = 0; i < this.emailsinput_edit_url.length; i++) {
      iftrue = r.test(this.emailsinput_edit_url[i].model)
      // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
      r.lastIndex = 0
      if (iftrue) {
        if_check_right = true
      } else {
        if_check_right = false
        break
      }
    }
    if (if_check_right && if_true_url) {
      this.display_edit_url = ''
      this.bt_dis_for_edtdtsub = false
    } else {
      this.bt_dis_for_edtdtsub = true
    }
  } else if (type === 'url_url') {
    if_true_url = r_wz.test(this.UrlSub.url)
    r_wz.lastIndex = 0
    if_check_right = false
    for (i = 0; i < this.emailsinput_url.length; i++) {
      iftrue = r.test(this.emailsinput_url[i].model)
      // 每次匹配结束成功的话lastIndex会到匹配成功的位置 如果不重置会出现错误
      r.lastIndex = 0
      if (iftrue) {
        if_check_right = true
      } else {
        if_check_right = false
        break
      }
    }
    if (if_check_right && if_true_url) {
      this.display_add_url = ''
      this.bt_dis_for_adddtsub = false
    } else {
      this.bt_dis_for_adddtsub = true
    }
  }
}

// 删除一个邮件输入框
function Deleteemail (type, index) {
  var r = /([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+.([A-Za-z]{2,4})/g
  var if_check_right = true
  // eslint-disable-next-line no-useless-escape
  var r_wz = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+/g
  switch (type) {
    case 'edit_theme':
      r.lastIndex = 0
      this.emailsinput_edit_theme.splice(index, 1)
      for (var i = 0; i < this.emailsinput_edit_theme.length; i++) {
        var iftrue = r.test(this.emailsinput_edit_theme[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if (if_check_right) {
        this.display_edit_theme = ''
        this.bt_dis_for_edtztsub = false
      }
      break
    case 'add_theme':
      r.lastIndex = 0
      this.emailsinput.splice(index, 1)
      for (i = 0; i < this.emailsinput.length; i++) {
        iftrue = r.test(this.emailsinput[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if (if_check_right) {
        this.display_add_theme = ''
        this.bt_dis_for_addztsub = false
      }
      break
    case 'add_word':
      this.emailsinput_word.splice(index, 1)
      for (i = 0; i < this.emailsinput_word.length; i++) {
        iftrue = r.test(this.emailsinput_word[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_inputs_word.length; i++) {
        iftrue = r_wz.test(this.url_inputs_word[i].model)
        r_wz.lastIndex = 0
        if (iftrue) {
          var if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if (if_check_right && if_check_right_url) {
        this.display_add_word = ''
        this.bt_dis_for_addfcsub = false
      } else if (if_check_right) {
        this.display_add_word = ''
      } else {
        this.display_add_word = 'none'
      }
      break
    case 'add_word_url':
      this.url_inputs_word.splice(index, 1)
      for (i = 0; i < this.emailsinput_word.length; i++) {
        iftrue = r.test(this.emailsinput_word[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_inputs_word.length; i++) {
        iftrue = r_wz.test(this.url_inputs_word[i].model)
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if (if_check_right && if_check_right_url) {
        this.display_add_word_url = ''
        this.bt_dis_for_addfcsub = false
      } else if (if_check_right_url) {
        this.display_add_word_url = ''
      } else {
        this.display_add_word_url = 'none'
      }
      break
    case 'edit_word':
      this.emailsinput_edit_word.splice(index, 1)
      for (i = 0; i < this.emailsinput_edit_word.length; i++) {
        iftrue = r.test(this.emailsinput_edit_word[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_edit_word.length; i++) {
        iftrue = r_wz.test(this.url_edit_word[i].model)
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if (if_check_right && if_check_right_url) {
        this.display_edit_word = ''
        this.bt_dis_for_edtfcsub = false
      } else if (if_check_right) {
        this.display_edit_word = ''
      } else {
        this.display_edit_word = 'none'
      }
      break
    case 'edit_word_url':
      this.url_edit_word.splice(index, 1)
      for (i = 0; i < this.emailsinput_edit_word.length; i++) {
        iftrue = r.test(this.emailsinput_edit_word[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      for (i = 0; i < this.url_edit_word.length; i++) {
        iftrue = r_wz.test(this.url_edit_word[i].model)
        r_wz.lastIndex = 0
        if (iftrue) {
          if_check_right_url = true
        } else {
          if_check_right_url = false
          break
        }
      }
      if (if_check_right && if_check_right_url) {
        this.display_edit_word_url = ''
        this.bt_dis_for_edtfcsub = false
      } else if (if_check_right) {
        this.display_edit_word_url = ''
      } else {
        this.display_edit_word_url = 'none'
      }
      break
    case 'add_url':
      this.emailsinput_url.splice(index, 1)
      for (i = 0; i < this.emailsinput_url.length; i++) {
        iftrue = r.test(this.emailsinput_url[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      var if_true_url = r_wz.test(this.UrlSub.url)
      if (if_check_right && if_true_url) {
        this.display_add_url = ''
        this.bt_dis_for_adddtsub = false
      } else if (if_check_right) {
        this.display_add_url = ''
      } else {
        this.display_add_url = 'none'
      }
      break
    case 'edit_url':
      this.emailsinput_edit_url.splice(index, 1)
      for (i = 0; i < this.emailsinput_edit_url.length; i++) {
        iftrue = r.test(this.emailsinput_edit_url[i].model)
        r.lastIndex = 0
        if (iftrue) {
          if_check_right = true
        } else {
          if_check_right = false
          break
        }
      }
      if_true_url = r_wz.test(this.UrlSubE.url)
      if (if_check_right && if_true_url) {
        this.display_edit_url = ''
        this.bt_dis_for_edtdtsub = false
      } else if (if_check_right) {
        this.display_edit_url = ''
      } else {
        this.display_edit_url = 'none'
      }
      break
  }
}

// 添加订阅的一个axios请求多次请求所以写一个函数
async function SendAxiosaddsub (data) {
  var axios = require('axios')
  var status = []
  var config = {
    method: 'post',
    // url: 'http://175.24.28.202:8000/api/v1/subs_service',
    url: 'http://175.24.28.202:80/api/s',
    headers: {
      'jwtToken': localStorage.getItem('token'),
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Host': 'http://175.24.28.202:80'
    },
    data: data}
  // 实现
  await axios(config)
    .then(function (response) {
      // 实现后返回的值 以及 再次访问到（/main）
      console.log(response.data)
      if (response.data.status === 1) {
        // me.$router.push({path: '/main', query: {username: me.$route.query.username}})
        status.push(1)
        status.push(response.data.data)
      } else {
        // me.$message.error(response.data.msg)
        status.push(0)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  return status
}

// 修改订阅也写一个
async function SendAxioseditsub (config) {
  var axios = require('axios')
  var status = 0
  // 实现
  await axios(config)
    .then(function (response) {
      // 实现后返回的值 以及 再次访问到（/main）
      console.log(response.data)
      if (response.data.status === 1) {
        // me.$router.push({path: '/main', query: {username: me.$route.query.username}})
        status = 1
      } else {
        // me.$message.error(response.data.msg)
        status = 0
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  return status
}

// 增加一个新的订阅
async function AddSub (type) {
  var me = this
  // 判断是哪一种订阅
  if (type === 'theme') {
    // 获取某一块值
    var lens_emails = this.emailsinput.length
    // 下面是需要的值
    var sub = this.ThemeSub.theme
    var keywords = this.ThemeSub.keyword
    var frequence = this.ThemeSub.freq
    var re_type = this.ThemeSub.return_type
    var i = 0
    var emails = ''
    var ifemailhasnone = 0
    for (i = 0; i < lens_emails; i++) {
      if (this.emailsinput[i].model === '') {
        ifemailhasnone += 1
      } else {
        if (i === (lens_emails - 1)) {
          emails = emails + this.emailsinput[i].model
        } else {
          emails = emails + this.emailsinput[i].model + ','
        }
      }
    }
    // 传递的参数
    var data = {
      'content': String(sub),
      'email': String(emails),
      'frequency': String(frequence[0]),
      'set_time': parseInt(frequence[1]),
      'sub_type': 'ztdy',
      'uid': String(this.$route.query.username),
      'keyword': String(keywords),
      'return_type': String(re_type)
    }
    // 判断是否有空值并传
    if (lens_emails !== 0 && sub !== '' && re_type !== '' && frequence !== '' && ifemailhasnone === 0) {
      // 实现
      var status = await SendAxiosaddsub(data)
      if (status[0] === 0) {
        this.$message.error('添加失败')
      } else {
        me.dialogFormThemeSubVisible = false
        me.tableData_Theme.push(
          {
            'Email': String(emails),
            'Frequency': String(frequence[0]),
            'Id': status[1].id,
            'Keyword': String(keywords),
            'SetTime': parseInt(frequence[1]),
            'Subject': String(sub),
            'SubscriptionID': status[1].subscription_id,
            'UID': String(this.$route.query.username),
            'ReturnType': String(re_type)
          }
        )
        me.emailsinput = [{model: ''}]
        // 下面是需要的值
        me.ThemeSub.theme = ''
        me.ThemeSub.keyword = ''
        me.$message({
          type: 'success',
          message: '添加成功!'
        })
      }
    } else {
      this.$message.error('有输入为空,添加失败')
    }
  } else if (type === 'word') {
    // 获取某一块值
    lens_emails = this.emailsinput_word.length
    var lens_url = this.url_inputs_word.length
    // 下面是需要的值
    var urls = ''
    var subscription = this.WordSub.theme
    frequence = this.WordSub.freq
    // var re_type = this.ThemeSub.return_type
    i = 0
    emails = ''
    ifemailhasnone = 0
    var ifurlhasnone = 0
    for (i = 0; i < lens_emails; i++) {
      if (this.emailsinput_word[i].model === '') {
        ifemailhasnone += 1
      } else {
        if (i === (lens_emails - 1)) {
          emails = emails + this.emailsinput_word[i].model
        } else {
          emails = emails + this.emailsinput_word[i].model + ','
        }
      }
    }
    var j = 0
    for (j = 0; j < lens_url; j++) {
      if (this.url_inputs_word[j].model === '') {
        ifurlhasnone += 1
      } else {
        if (j === (lens_url - 1)) {
          urls = urls + this.url_inputs_word[j].model
        } else {
          urls = urls + this.url_inputs_word[j].model + ','
        }
      }
    }
    // 传递的参数
    data = {
      'content': String(urls),
      'email': String(emails),
      'frequency': String(frequence[0]),
      'set_time': parseInt(frequence[1]),
      'sub_type': 'fcdy',
      'uid': String(this.$route.query.username),
      'keyword': '',
      'return_type': '',
      'subject': String(subscription)
    }
    // 判断是否有空值并传
    if (subscription !== '' && lens_emails !== 0 && frequence !== '' && ifemailhasnone === 0 && urls !== '' && lens_url !== 0 && ifurlhasnone === 0) {
      // 实现
      status = await SendAxiosaddsub(data)
      console.log(status)
      if (status[0] === 0) {
        this.$message.error('添加失败')
      } else {
        me.dialogFormWordSubVisible = false
        me.$message({
          type: 'success',
          message: '添加成功!'
        })
        me.tableData_WordCount.push({
          'Email': String(emails),
          'Frequency': String(frequence[0]),
          'Id': status[1].id,
          'SetTime': parseInt(frequence[1]),
          'SubscriptionID': status[1].subscription_id,
          'UID': String(me.$route.query.username),
          'Url': String(urls),
          'Subject': String(subscription)
        })
        me.emailsinput_word = [{model: ''}]
        me.url_inputs_word = [{model: ''}]
      }
    } else {
      this.$message.error('有输入为空，添加失败')
    }
  } else if (type === 'url') {
    lens_emails = this.emailsinput_url.length
    // 下面是需要的值
    var url = this.UrlSub.url
    frequence = this.UrlSub.freq
    subscription = this.UrlSub.theme
    // var re_type = this.ThemeSub.return_type
    i = 0
    emails = ''
    ifemailhasnone = 0
    for (i = 0; i < lens_emails; i++) {
      if (this.emailsinput_url[i].model === '') {
        ifemailhasnone += 1
      } else {
        if (i === (lens_emails - 1)) {
          emails = emails + this.emailsinput_url[i].model
        } else {
          emails = emails + this.emailsinput_url[i].model + ','
        }
      }
    }
    // 传递的参数
    data = {
      'content': String(url),
      'email': String(emails),
      'frequency': String(frequence[0]),
      'set_time': parseInt(frequence[1]),
      'sub_type': 'dtdy',
      'uid': String(this.$route.query.username),
      'subject': String(subscription)
    }
    // 判断是否有空值并传
    if (subscription !== '' && lens_emails !== 0 && frequence !== '' && ifemailhasnone === 0 && url !== '') {
      // 实现
      status = await SendAxiosaddsub(data)
      if (status[0] === 0) {
        this.$message.error('添加失败')
      } else {
        me.dialogFormUrlSubVisible = false
        me.$message({
          type: 'success',
          message: '添加成功!'
        })
        me.tableData_Url.push({
          'Email': String(emails),
          'Frequency': String(frequence[0]),
          'Id': status[1].id,
          'SetTime': parseInt(frequence[1]),
          'SubscriptionID': status[1].subscription_id,
          'UID': String(me.$route.query.username),
          'Url': String(url),
          'Subject': String(subscription)
        })
        me.emailsinput_url = [{model: ''}]
        // 下面是需要的值
        me.UrlSub.url = ''
      }
    } else {
      this.$message.error('有输入为空，添加失败')
    }
  }
}

// 页面加载函数 获取订阅值并赋给前端
async function Whenload (uid) {
  var axios = require('axios')
  var all_subs = []
  var getsubconf = {
    method: 'get',
    // url: 'http://175.24.28.202:8000/api/v1/subs_service/' + uid,
    url: 'http://175.24.28.202:80/api/s/' + uid,
    headers: {
      'jwtToken': localStorage.getItem('token'),
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  await axios(getsubconf)
    .then(function (response) {
      if (response.data.data.dtdy === null) {
        var dtdy_s = []
      } else {
        dtdy_s = response.data.data.dtdy
      }
      if (response.data.data.fcdy === null) {
        var fcdy_s = []
      } else {
        fcdy_s = response.data.data.fcdy
      }
      if (response.data.data.ztdy === null) {
        var ztdy_s = []
      } else {
        ztdy_s = response.data.data.ztdy
      }
      all_subs = [ztdy_s, fcdy_s, dtdy_s]
    // console.log(ztdy_s)
    // me.$router.push({path: '/main', query: {username: me.$route.query.username, dtdy: dtdy_s, fcdy: fcdy_s, ztdy: ztdy_s}})
    })
    .catch(function (error) {
      console.log(error)
    })
  return all_subs
}

// 删除某一行
function DeleteRow (type, val) {
  var axios = require('axios')
  var me = this
  if (type === 'theme') {
    this.$confirm('此操作将永久删除该订阅, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      var index = val + this.pagesize_theme * (this.currentpage_theme - 1)
      var config = {
        method: 'delete',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/' + this.tableData_Theme[index].SubscriptionID,
        url: 'http://175.24.28.202:80/api/s/' + this.tableData_Theme[index].SubscriptionID,
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
      axios(config)
        .then(function (response) {
          if (response.data.status === 1) {
            me.$message({
              type: 'success',
              message: '删除成功!'
            })
            me.tableData_Theme.splice(index, 1)
          } else {
            me.$message.error('删除失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  } else if (type === 'word') {
    this.$confirm('此操作将永久删除该订阅, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      var index = val + this.pagesize_word * (this.currentpage_word - 1)
      var config = {
        method: 'delete',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/' + this.tableData_WordCount[index].SubscriptionID,
        url: 'http://175.24.28.202:80/api/s/' + this.tableData_WordCount[index].SubscriptionID,
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
      axios(config)
        .then(function (response) {
          if (response.data.status === 1) {
            me.$message({
              type: 'success',
              message: '删除成功!'
            })
            me.tableData_WordCount.splice(index, 1)
          } else {
            me.$message.error('删除失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  } else if (type === 'url') {
    this.$confirm('此操作将永久删除该订阅, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      var index = val + this.pagesize_url * (this.currentpage_url - 1)
      var config = {
        method: 'delete',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/' + this.tableData_Url[index].SubscriptionID,
        url: 'http://175.24.28.202:80/api/s/' + this.tableData_Url[index].SubscriptionID,
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
      axios(config)
        .then(function (response) {
          if (response.data.status === 1) {
            me.$message({
              type: 'success',
              message: '删除成功!'
            })
            me.tableData_Url.splice(index, 1)
          } else {
            me.$message.error('删除失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  // var length_the = this.tableData_Theme.indexOf(val);
  // tableData.splice(index,1);
  // visible_for_theme_confirm=false;
}

// 编辑某一行的数据
function EditRowOpen (type, val) {
  if (type === 'theme') {
    // val为当前页面的当前行，tableData为上面定义的tableData
    this.dialogFormThemeSubEVisible = true
    this.emailsinput_edit_theme = []
    var index = val + this.pagesize_theme * (this.currentpage_theme - 1)
    // 给打开的修改订阅表赋上初始值
    this.ThemeSubE.theme = this.tableData_Theme[index].Subject
    this.ThemeSubE.keyword = this.tableData_Theme[index].Keyword
    // freq在网页上的值为一个数组 [频率，时间(string)]
    this.ThemeSubE.freq = [this.tableData_Theme[index].Frequency, this.tableData_Theme[index].SetTime.toString()]
    this.ThemeSubE.return_type = this.tableData_Theme[index].ReturnType
    var emails = this.tableData_Theme[index].Email.split(',')
    var length_emails = emails.length
    var i = 0
    for (i = 0; i < length_emails; i++) {
      this.emailsinput_edit_theme.push({model: emails[i]})
    }
    this.ThemeSubE.Subid = this.tableData_Theme[index].SubscriptionID
  } else if (type === 'word') {
    this.dialogFormWordSubEVisible = true
    this.emailsinput_edit_word = []
    this.url_edit_word = []
    index = val + this.pagesize_word * (this.currentpage_word - 1)
    emails = this.tableData_WordCount[index].Email.split(',')
    length_emails = emails.length
    i = 0
    for (i = 0; i < length_emails; i++) {
      this.emailsinput_edit_word.push({model: emails[i]})
    }
    var urls = this.tableData_WordCount[index].Url.split(',')
    var length_urls = urls.length
    var j = 0
    for (j = 0; j < length_urls; j++) {
      this.url_edit_word.push({model: urls[j]})
    }
    this.WordSubE.freq = [this.tableData_WordCount[index].Frequency, this.tableData_WordCount[index].SetTime.toString()]
    this.WordSubE.Subid = this.tableData_WordCount[index].SubscriptionID
    this.WordSubE.theme = this.tableData_WordCount[index].Subject
  } else if (type === 'url') {
    this.dialogFormUrlSubEVisible = true
    this.emailsinput_edit_url = []
    index = val + this.pagesize_url * (this.currentpage_url - 1)
    emails = this.tableData_Url[index].Email.split(',')
    length_emails = emails.length
    i = 0
    for (i = 0; i < length_emails; i++) {
      this.emailsinput_edit_url.push({model: emails[i]})
    }
    this.UrlSubE.url = this.tableData_Url[index].Url
    this.UrlSubE.freq = [this.tableData_Url[index].Frequency, this.tableData_Url[index].SetTime.toString()]
    this.UrlSubE.Subid = this.tableData_Url[index].SubscriptionID
    this.UrlSubE.theme = this.tableData_Url[index].Subject
  }
}

// 修改订阅具体操作
async function PushEdit (type) {
  if (type === 'theme') {
    var emails_length = this.emailsinput_edit_theme.length
    var emails = ''
    var ifemailhasnone = 0
    for (var i = 0; i < emails_length; i++) {
      if (this.emailsinput_edit_theme[i].model === '') {
        ifemailhasnone = ifemailhasnone + 1
      } else {
        if (i === (emails_length - 1)) {
          emails = emails + this.emailsinput_edit_theme[i].model
        } else {
          emails = emails + this.emailsinput_edit_theme[i].model + ','
        }
      }
    }
    if (emails !== '' && this.ThemeSubE.theme !== '') {
    // 以下是数据项
      var data = {
        'content': String(this.ThemeSubE.theme),
        'email': String(emails),
        'frequency': String(this.ThemeSubE.freq[0]),
        'set_time': parseInt(this.ThemeSubE.freq[1]),
        'subscription_id': String(this.ThemeSubE.Subid),
        'uid': String(this.$route.username),
        'keyword': String(this.ThemeSubE.keyword),
        'return_type': String(this.ThemeSubE.return_type)
      }
      var config = {
        method: 'put',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/',
        url: 'http://175.24.28.202:80/api/s/',
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: data
      }
      var status = await SendAxioseditsub(config)
      if (status[0] === 0) {
        this.$message.error('修改失败')
      } else {
        this.dialogFormThemeSubEVisible = false
        for (i = 0; i < this.tableData_Theme.length; i++) {
          if (this.tableData_Theme[i].SubscriptionID === this.ThemeSubE.Subid) {
            this.tableData_Theme[i].Email = emails
            this.tableData_Theme[i].Frequency = String(this.ThemeSubE.freq[0])
            this.tableData_Theme[i].Keyword = String(this.ThemeSubE.keyword)
            this.tableData_Theme[i].SetTime = parseInt(this.ThemeSubE.freq[1])
            this.tableData_Theme[i].Subject = String(this.ThemeSubE.theme)
            this.tableData_Theme[i].ReturnType = String(this.ThemeSubE.return_type)
          }
        }
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }
    } else {
      this.$message.error('有数据为空')
    }
  } else if (type === 'word') {
    emails_length = this.emailsinput_edit_word.length
    var url_length = this.url_edit_word.length
    emails = ''
    var urls = ''
    ifemailhasnone = 0
    var ifurlhasnone = 0
    for (i = 0; i < emails_length; i++) {
      if (this.emailsinput_edit_word[i].model === '') {
        ifemailhasnone = ifemailhasnone + 1
      } else {
        if (i === (emails_length - 1)) {
          emails = emails + this.emailsinput_edit_word[i].model
        } else {
          emails = emails + this.emailsinput_edit_word[i].model + ','
        }
      }
    }
    for (var j = 0; j < url_length; j++) {
      if (this.url_edit_word[j].model === '') {
        ifurlhasnone = ifurlhasnone + 1
      } else {
        if (j === (url_length - 1)) {
          urls = urls + this.url_edit_word[j].model
        } else {
          urls = urls + this.url_edit_word[j].model + ','
        }
      }
    }
    if (this.WordSubE.theme !== '' && emails !== '' && ifurlhasnone === 0 && ifemailhasnone === 0) {
    // 以下是数据项
      data = {
        'content': String(urls),
        'email': String(emails),
        'frequency': String(this.WordSubE.freq[0]),
        'set_time': parseInt(this.WordSubE.freq[1]),
        'keyword': '',
        'subscription_id': String(this.WordSubE.Subid),
        'uid': String(this.$route.username),
        'subject': String(this.WordSubE.theme)
      }
      config = {
        method: 'put',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/',
        url: 'http://175.24.28.202:80/api/s/',
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: data
      }
      status = await SendAxioseditsub(config)
      if (status[0] === 0) {
        this.$message.error('修改失败')
      } else {
        for (i = 0; i < this.tableData_WordCount.length; i++) {
          if (this.tableData_WordCount[i].SubscriptionID === this.WordSubE.Subid) {
            this.tableData_WordCount[i].Email = String(emails)
            this.tableData_WordCount[i].Frequency = String(this.WordSubE.freq[0])
            this.tableData_WordCount[i].SetTime = parseInt(this.WordSubE.freq[1])
            this.tableData_WordCount[i].Url = String(urls)
            this.tableData_WordCount[i].Subject = String(this.WordSubE.theme)
          }
        }
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.dialogFormWordSubEVisible = false
      }
    } else {
      this.$message.error('有数据为空')
    }
  } else if (type === 'url') {
    emails_length = this.emailsinput_edit_url.length
    emails = ''
    ifemailhasnone = 0
    for (i = 0; i < emails_length; i++) {
      if (this.emailsinput_edit_url[i].model === '') {
        ifemailhasnone = ifemailhasnone + 1
      } else {
        if (i === (emails_length - 1)) {
          emails = emails + this.emailsinput_edit_url[i].model
        } else {
          emails = emails + this.emailsinput_edit_url[i].model + ','
        }
      }
    }
    if (emails !== '' && this.UrlSubE.url !== '' && this.UrlSubE.theme !== '') {
    // 以下是数据项
      data = {
        'content': String(this.UrlSubE.url),
        'email': String(emails),
        'frequency': String(this.UrlSubE.freq[0]),
        'set_time': parseInt(this.UrlSubE.freq[1]),
        'keyword': '',
        'subscription_id': String(this.UrlSubE.Subid),
        'uid': String(this.$route.username),
        'subject': String(this.UrlSubE.theme)
      }
      config = {
        method: 'put',
        // url: 'http://175.24.28.202:8000/api/v1/subs_service/',
        url: 'http://175.24.28.202:80/api/s/',
        headers: {
          'jwtToken': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
          // 'Host': 'http://175.24.28.202:80'
        },
        data: data
      }
      status = await SendAxioseditsub(config)
      if (status[0] === 0) {
        this.$message.error('修改失败')
      } else {
        this.dialogFormUrlSubEVisible = false
        for (i = 0; i < this.tableData_Url.length; i++) {
          if (this.tableData_Url[i].SubscriptionID === this.UrlSubE.Subid) {
            this.tableData_Url[i].Email = String(emails)
            this.tableData_Url[i].Frequency = String(this.UrlSubE.freq[0])
            this.tableData_Url[i].SetTime = parseInt(this.UrlSubE.freq[1])
            this.tableData_Url[i].Url = String(this.UrlSubE.url)
            this.tableData_Url[i].Subject = String(this.UrlSubE.theme)
          }
        }
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }
    } else {
      this.$message.error('有数据为空')
    }
  }
}

// 这个用来加载echarts
function LoadEcharts (position, wordfreq) {
  var indicator_val = []
  var datavalue = []
  var word_list = wordfreq.split(',')
  for (var i = 0; i < word_list.length; i++) {
    var word_one = word_list[i].split(':')
    indicator_val.push({name: word_one[0]})
    datavalue.push(word_one[1])
  }
  // 再刷新前需要使用这个重置一下，在每次清空后重新加载
  document.getElementById(position).removeAttribute('_echarts_instance_')
  var myChart = this.$echarts.init(document.getElementById(position))
  var option = {
    title: {
      text: '词频雷达图'
    },
    tooltip: {},
    legend: {
      data: ['词频']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicator_val
    },
    series: [{
      name: '词频',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: datavalue,
          name: '统计词频'
        }
      ]}]
  }
  myChart.setOption(option)
}

// 发送查询请求
async function SelectSub (subid) {
  var axios = require('axios')
  var config = {
    method: 'get',
    // url: 'http://175.24.28.202:8000/api/v1/results/' + subid,
    url: 'http://175.24.28.202:80/api/v1/results/' + subid,
    headers: {
      'jwtToken': localStorage.getItem('token'),
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  var result = []
  await axios(config)
    .then(function (response) {
      // 实现后返回的值 以及 再次访问到（/main）
      result = response.data.data
    })
    .catch(function (error) {
      console.log(error)
    })
  return result
}

// 加载页面时的总方法
async function Onload (username) {
  var a = await Whenload(username)
  this.tableData_Theme = a[0]
  this.tableData_WordCount = a[1]
  this.tableData_Url = a[2]
  var datenow = new Date()
  console.log(datenow.toLocaleDateString())
  // 主题订阅页面内容
  if (this.tableData_Theme.length === 0) {
    this.ztdy_foot = []
    this.first_show_foot = 'none'
    this.first_show_foot_other = ''
  } else {
    this.detail_get_id_ztdy = this.tableData_Theme[0].SubscriptionID
    var value_zt = await this.$SelectSub(this.tableData_Theme[0].SubscriptionID)
    console.log(value_zt)
    if (value_zt.result === null) {
      this.first_show_foot = 'none'
      this.first_show_foot_other = ''
    } else {
      this.ztdy_foot = value_zt.result
      this.ztdy_all_page = parseInt(value_zt.result.length / 25)
      if (value_zt.result.length > this.ztdy_all_page * 25) {
        this.ztdy_all_page += 1
      }
      if (this.ztdy_all_page === 1) {
        this.ztdowndisabled = true
        this.ztupdisabled = true
      } else {
        this.ztdowndisabled = false
        this.ztupdisabled = true
      }
      for (var i = 0; i < this.ztdy_foot.length; i++) {
        var date_i = new Date(this.ztdy_foot[i].ExecTime)
        var date_week = new Date(datenow - 24 * 60 * 60 * 1000 * 7)
        if (date_i.toDateString() === datenow.toDateString()) {
          this.ztdy_today.push(this.ztdy_foot[i])
          console.log('1')
        } else if (Date.parse(date_i.toDateString()) < Date.parse(datenow.toDateString()) && Date.parse(date_i.toDateString()) > Date.parse(date_week.toDateString())) {
          this.ztdy_week.push(this.ztdy_foot[i])
          console.log('2')
        } else {
          this.ztdy_longer.push(this.ztdy_foot[i])
          console.log('3')
        }
      }
      this.first_show_foot = ''
      this.first_show_foot_other = 'none'
    }
  }
  // 动态订阅页面内容
  if (this.tableData_Url.length === 0) {
    this.dtdy_foot = []
    this.third_show_foot = 'none'
    this.third_show_foot_other = ''
  } else {
    this.detail_get_id_dtdy = this.tableData_Url[0].SubscriptionID
    this.dtdy_subject = this.tableData_Url[0].Subject
    var value_dt = await this.$SelectSub(this.tableData_Url[0].SubscriptionID)
    this.dtdy_foot = value_dt.result
    if (value_dt.result === null) {
      this.third_show_foot = 'none'
      this.third_show_foot_other = ''
    } else {
      this.dtdy_all_page = parseInt(value_dt.result.length / 25)
      if (value_dt.result.length > this.dtdy_all_page * 25) {
        this.dtdy_all_page += 1
      }
      if (this.dtdy_all_page === 1) {
        this.dtdowndisabled = true
        this.dtupdisabled = true
      } else {
        this.dtdowndisabled = false
        this.dtupdisabled = true
      }
      for (i = 0; i < this.dtdy_foot.length; i++) {
        date_i = new Date(this.dtdy_foot[i].ExecTime)
        date_week = new Date(datenow - 24 * 60 * 60 * 1000 * 7)
        if (date_i.toDateString() === datenow.toDateString()) {
          this.dtdy_today.push(this.dtdy_foot[i])
        } else if (Date.parse(date_i.toDateString()) < Date.parse(datenow.toDateString()) && Date.parse(date_i.toDateString()) > Date.parse(date_week.toDateString())) {
          this.dtdy_week.push(this.dtdy_foot[i])
        } else {
          this.dtdy_longer.push(this.dtdy_foot[i])
        }
      }
      this.third_show_foot = ''
      this.third_show_foot_other = 'none'
    }
  }
  // 分词订阅页面内容
  if (this.tableData_WordCount.length === 0) {
    this.fcdy_foot_read = []
    this.fcdy_foot_unread = []
    this.second_show_foot = ''
    this.second_show_foot_other = ''
  } else {
    this.detail_get_id_fcdy = this.tableData_WordCount[0].SubscriptionID
    var value_fc = await this.$SelectSub(this.tableData_WordCount[0].SubscriptionID)
    this.fcdy_foot = value_fc.result
    console.log(this.fcdy_foot)
    if (this.fcdy_foot === null) {
      this.second_show_foot = 'none'
      this.second_show_foot_other = ''
    } else {
      this.$LoadEcharts('echartsposition', this.fcdy_foot[0].WordFrequency)
      this.second_show_foot = ''
      this.second_show_foot_other = 'none'
    }
  }
}

// 获取结果详情
async function GetDetail (type) {
  if (type === 'ztdy') {
    this.dialogVisibleztdy = true
  } else if (type === 'fcdy') {
    this.fcdy_table_item = []
    this.$refs.fcdialog.open()
    this.dialogVisiblefcdy = true
  } else {
    this.dialogVisibledtdy = true
  }
}

// 发送已读
function HaveReadThis (id, type) {
  var axios = require('axios')
  var data = {
    'id': id,
    'sub_type': type
  }
  var me = this
  var conf = {
    method: 'post',
    // url: 'http://175.24.28.202:8000/api/v1/results',
    url: 'http://175.24.28.202:80/api/v1/results',
    headers: {
      'jwtToken': localStorage.getItem('token'),
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Host': 'http://175.24.28.202:80'
    },
    data: data
  }
  axios(conf)
    .then(function (response) {
      if (type === 'ztdy') {
        for (var i = 0; i < me.ztdy_foot.length; i++) {
          if (me.ztdy_foot[i].Id === id) {
            me.ztdy_foot[i].ReadMark = 'True'
          }
        }
      } else if (type === 'dtdy') {
        for (i = 0; i < me.dtdy_foot.length; i++) {
          if (me.dtdy_foot[i].Id === id) {
            me.dtdy_foot[i].ReadMark = 'True'
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// 刷新动态
async function Refreshdt (type) {
  if (type === 'ztdy') {
    if (this.detail_get_id_ztdy === '') {
      this.ztdy_foot_read = []
      this.ztdy_foot_unread = []
      this.first_show_foot = 'none'
      this.first_show_foot_other = ''
    } else {
      var value_zt = await this.$SelectSub(this.detail_get_id_ztdy)
      this.ztdy_foot_unread = value_zt.unRead
      this.ztdy_foot_read = value_zt.Read
      if (this.ztdy_foot_read.length === 0 && this.ztdy_foot_unread.length === 0) {
        this.first_show_foot = 'none'
        this.first_show_foot_other = ''
      } else {
        this.first_show_foot = ''
        this.first_show_foot_other = 'none'
      }
    }
  } else if (type === 'dtdy') {
    if (this.detail_get_id_dtdy === '') {
      this.dtdy_foot_read = []
      this.dtdy_foot_unread = []
      this.third_show_foot = 'none'
      this.third_show_foot_other = ''
    } else {
      var value_dt = await this.$SelectSub(this.detail_get_id_dtdy)
      this.dtdy_foot_read = value_dt.Read
      this.dtdy_foot_unread = value_dt.unRead
      if (this.dtdy_foot_read.length === 0 && this.dtdy_foot_unread.length === 0) {
        this.third_show_foot = 'none'
        this.third_show_foot_other = ''
      } else {
        this.third_show_foot = ''
        this.third_show_foot_other = 'none'
      }
    }
  } else {
    if (this.detail_get_id_fcdy === '') {
      this.fcdy_foot_read = []
      this.fcdy_foot_unread = []
      this.second_show_foot = ''
      this.second_show_foot_other = ''
    } else {
      var value_fc = await this.$SelectSub(this.detail_get_id_fcdy)
      this.fcdy_foot_read = value_fc.Read
      this.fcdy_foot_unread = value_fc.unRead
      if (this.fcdy_foot_read.length === 0 && this.fcdy_foot_unread.length === 0) {
        this.second_show_foot = ''
        this.second_show_foot_other = ''
      } else {
        if (this.fcdy_foot_read.length === 0) {
          this.$LoadEcharts('echartsposition', this.fcdy_foot_unread[0].WordFrequency)
          this.second_show_foot = ''
          this.second_show_foot_other = 'none'
        } else {
          this.$LoadEcharts('echartsposition', this.fcdy_foot_read[0].WordFrequency)
          this.second_show_foot = ''
          this.second_show_foot_other = 'none'
        }
      }
    }
  }
}
      function unique(arr){
        newarr=[]
        for(i=0;i<arr.length;i++){
        if (a.indexOf(arr[i])==i){
        newarr.push(arr[i])
        }

        }
        return newarr;

      }

export {
  Addemail,
  Deleteemail,
  AddSub,
  Onload,
  DeleteRow,
  EditRowOpen,
  PushEdit,
  LoadEcharts,
  SelectSub,
  GetDetail,
  HaveReadThis,
  CheckEamil,
  Refreshdt
}
