<template>
  <div>
    <Form
      inline
      :label-width="80"
      label-position="right"
      :rules="topicValidate"
      :model="topicData"
      ref="topicForm"
    >
      <FormItem label="辩题" prop="topic">
        <Input class="full" v-model="topicData.topic" placeholder="辩题"></Input>
      </FormItem>
      <FormItem label="正方" prop="a_side">
        <Input class="full" v-model="topicData.a_side" placeholder="正方辩题"></Input>
      </FormItem>
      <FormItem label="反方" prop="b_side">
        <Input class="full" v-model="topicData.b_side" placeholder="反方辩题"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'topic',
  data () {
    return {
      topicData: {
          topic: '',
          a_side: '',
          b_side: '',
      },
      topicValidate: {
        topic: [
          {
            required: true,
            message: '辩题不能为空',
            trigger: 'blur'
          }
        ],
        a_side: [
          {
            required: true,
            message: '立场不能为空',
            trigger: 'blur'
          }
        ],
        b_side: [
          {
            required: true,
            message: '立场不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.full {
  width: 390px;
}
</style>
