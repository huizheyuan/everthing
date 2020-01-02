<template>
  <div>
    <Button v-if="token" type="warning" ghost shape="circle" @click="topicModal = true">发表辩题</Button>
    <router-link v-else to="/login" target="_blank">
        <Button type="warning" ghost shape="circle">登录</Button>
    </router-link>
    <Modal
      title="发表辩题"
      v-model="topicModal"
      :loading="loading"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="辩题" prop="topic">
            <Input v-model="formValidate.topic"/>
        </FormItem>
        <FormItem label="正方" prop="a_side">
            <Input v-model="formValidate.a_side"/>
        </FormItem>
        <FormItem label="反方" prop="b_side">
            <Input v-model="formValidate.b_side"/>
        </FormItem>
        <FormItem label="分类" prop="select">
            <Select v-model="formValidate.select">
                <Option value="1">kaka</Option>
                <Option v-for="item in catalogs" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
        </FormItem>
      </Form>
      <div slot="footer">
          <Button shape="circle" type="warning" @click="handleSubmit('formValidate')">发布</Button>
          <Button shape="circle" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {SERVER} from '@/config'
import { getToken, quit, publish } from '../libs/user'
export default {
  name: 'launchTopic',
  data () {
    return {
      token: getToken(),
      topicModal: false,
      loading: false,
      catalogs: [],
      formValidate: {
          topic: '',
          a_side: '',
          b_side: '',
          select: '',
          desc: ''
      },
      ruleValidate: {
          topic: [{ required: true, message: '题目不能为空', trigger: 'blur' }],
          a_side: [{ required: true, message: '立场不能为空', trigger: 'blur' }],
          b_side: [{ required: true, message: '立场不能为空', trigger: 'blur' }],
          select: [{ required: true, message: '请选择分类', trigger: 'change' }]
      }
    }
  },
  beforeCreate() {
    this.$axios(SERVER + 'content/catalog').then(res => this.catalogs = res.data)
  },
  methods: {
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
                // publish(this.$refs[name].model).then(res=>{
                //   console.log(res.data)
                //   console.log("fghdsfh")
                // })
                this.$axios({
                  url: SERVER + 'content/publish',
                  method: 'post',
                  data: $qs.stringify(mForm)
                }).then(res=>{
                  console.log("sss")
                })
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    },
  },
}
</script>
