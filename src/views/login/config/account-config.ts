export const rules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
