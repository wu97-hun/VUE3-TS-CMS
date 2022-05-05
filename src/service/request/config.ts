let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 由于配置了devServer所以修改BSASE_URL这样才能映射
  // BASE_URL = '/api'
  BASE_URL = 'http://152.136.185.210:4000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = 'http://152.136.185.210:4000'
}

export { BASE_URL, TIME_OUT }
