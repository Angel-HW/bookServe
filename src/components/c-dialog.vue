<template>
  <div>
    <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    :before-close="dialogBeforeClose"
    @close="dialogClose"
    :append-to-body="appendToBody">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogConfirm">确 定</el-button>
    </span>
    </el-dialog>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'c-dialog',
  props: {
    value: {
      type:Boolean,
      default:false
    },
    title: {
      type:String,
      default:''
    },
    appendToBody: {
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    dialogClose () {
        this.visible = false,
        this.$emit('input',this.visible)
    },
    dialogCancel () {
        this.$emit('dialog-cancel')
    },

    dialogConfirm () {
        this.$emit('dialog-confirm')
    },
    dialogBeforeClose () {
        this.$emit('dialog-before-close')
        this.visible = false
    },
  },
  watch: {
  value: {
    handler (value) {
      this.visible=value
    },
    deep: true
  }
  }
}
</script>