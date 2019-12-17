<!--
 * @name: 
 * @author: SunSeekerX
 * @time: 2019-12-16 22:43:06
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2019-12-17 01:51:17
 -->

<template>
  <div class="page">
    <div class="container">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="添加" name="first">
          <el-form ref="form" :model="form">
            <el-form-item>
              <!-- textarea -->
              <el-input
                class="textarea"
                type="textarea"
                :rows="25"
                placeholder="请输入邀请码，一行一个，输入错误的格式将无法格式化！"
                v-model="form.code"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
              <el-button type="danger" @click="form.code = ''">清空</el-button>
            </el-form-item>
          </el-form>

          <!-- Result table -->
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="index" label="索引"></el-table-column>
            <el-table-column prop="code" label="邀请码"></el-table-column>
            <el-table-column label="信息">
              <template slot-scope="scope">
                <el-button
                  :type="scope.row.success ? 'success' : 'danger'"
                  :icon="scope.row.success ? 'el-icon-check' : 'el-icon-circle-close'"
                  circle
                ></el-button>
                <!-- <el-button :type="scope.row.success ? 'success' : 'danger'" :icon="scope.row.success ? 'el-icon-check' : 'el-icon-circle-close'" cirle></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 邀请码获取panel -->
        <el-tab-pane label="获取邀请码" name="second">
          <el-form ref="form" :model="form">
            <el-form-item label="数据条数">
              <el-input v-model.number="limit"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- textarea -->
              <el-input
                v-model="form.getCode"
                class="textarea"
                type="textarea"
                :rows="20"
                placeholder="暂无数据,默认查询50条数据，按创建时间排序，也就是优先查询最新的数据。"
                readonly
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onCopy">复制</el-button>
              <el-button type="primary" @click="onGetCode">获取数据</el-button>
              <el-button type="primary" @click="onGetCodeNextPage">下一页</el-button>
              <el-button
                type="primary"
                @click="(form.getCode = '', noMore = false, limit = 50, offset = 0)"
              >重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: '',
        getCode: ''
      },
      limit: 50,
      offset: 0,
      tableData: [],
      activeName: 'first',
      noMore: false
    }
  },
  methods: {
    async onSubmit() {
      if (this.$util.trim(this.form.code)) {
        const codeArr = this.form.code.split('\n')
        try {
          const res = await this.$api.Common.add({
            code: codeArr
          })

          if (res.success) {
            this.tableData = res.data
          }

          this.$notify({
            message: res.msg,
            type: 'success'
          })
        } catch (e) {
          // Handle api request exception
          this.$handleError.handleApiRequestException(e)
        }
      } else {
        this.form.code = ''
        this.$notify({
          message: '请输入邀请码!',
          type: 'error'
        })
      }
    },
    // 复制
    onCopy() {
      this.$copyText(this.form.getCode)
        .then(() => {
          this.$notify({
            message: '成功复制到剪贴板',
            type: 'success'
          })
        })
        .catch(() => {
          this.$notify({
            message: '复制失败',
            type: 'error'
          })
        })
    },
    // 获取数据
    async onGetCode() {
      if (this.noMore) {
        this.$notify({
          message: '没有更多数据了',
          type: 'info'
        })
      } else {
        try {
          const res = await this.$api.Common.getCode({
            limit: this.limit,
            offset: this.offset
          })
          if (res.success) {
            if (res.data.rows && res.data.rows.length) {
              let getCode = ''
              for (let i = 0; i < res.data.rows.length; i++) {
                if (i === 0) {
                  getCode = res.data.rows[i].code
                } else {
                  getCode = getCode + '\n' + res.data.rows[i].code
                }
              }
              this.form.getCode = getCode
            }
            // 判断是否加载完毕
            if (res.data.rows.length < this.limit) {
              this.noMore = true
            }
          }

          // if (res.success) {
          // }

          this.$notify({
            message: res.msg,
            type: 'success'
          })
        } catch (e) {
          // Handle api request exception
          this.$handleError.handleApiRequestException(e)
        }
      }
    },
    // 下一页
    onGetCodeNextPage() {
      if (this.noMore) {
        this.$notify({
          message: '没有更多数据了',
          type: 'info'
        })
      } else {
        this.offset = this.offset + this.limit
        this.onGetCode()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include flex-center;
  width: 100%;
  .container {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    max-width: 500px;
    .textarea {
      width: 100%;
    }
  }
}
</style>
