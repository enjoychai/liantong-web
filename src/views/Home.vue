<!--
 * @name: 
 * @author: SunSeekerX
 * @time: 2019-12-16 22:43:06
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2019-12-17 21:42:56
 -->

<template>
  <div class="page">
    <div class="container">
      <el-tabs v-model="activeName" type="card">
        <!-- 添加面板 -->
        <el-tab-pane label="添加" name="first">
          <el-form ref="form-first" :model="form">
            <el-form-item>
              <!-- textarea -->
              <el-input
                class="textarea"
                type="textarea"
                :rows="20"
                placeholder="请输入邀请码，一行一个，输入错误的格式将无法格式化！单次最大添加1000条"
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
                  :icon="
                    scope.row.success ? 'el-icon-check' : 'el-icon-circle-close'
                  "
                  circle
                ></el-button>
                <!-- <el-button :type="scope.row.success ? 'success' : 'danger'" :icon="scope.row.success ? 'el-icon-check' : 'el-icon-circle-close'" cirle></el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 邀请码获取面板 -->
        <el-tab-pane label="获取邀请码" name="second">
          <el-form ref="form-second" :model="form">
            <el-form-item label="数据条数，最大500">
              <el-input v-model.number="limit"></el-input>
            </el-form-item>
            <el-form-item label="自定义偏移量，不能超过总数，可以跳过新数据拉取老的数据">
              <el-input v-model.number="offset"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- textarea -->
              <el-input
                v-model="form.getCode"
                class="textarea"
                type="textarea"
                :rows="10"
                placeholder="暂无数据,默认查询50条数据，按创建时间排序，也就是优先查询最新的数据。"
                readonly
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onCopy">复制</el-button>
              <el-button type="primary" @click="onGetCode">获取数据</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onGetCodeNextPage">下一页</el-button>
              <el-button
                type="primary"
                @click="
                  ;(form.getCode = ''),
                    (noMore = false),
                    (limit = 50),
                    (offset = 0)
                "
              >重置</el-button>
              <el-button type="info">总条数： {{ form.count }}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 在线刷金币面板 -->
        <el-tab-pane label="在线刷金币" name="third">
          <el-form ref="form-third">
            <!-- encryptMobile -->
            <el-form-item label="encryptMobile">
              <el-input v-model="form.encryptMobile"></el-input>
            </el-form-item>
            <!-- textarea -->
            <el-form-item>
              <el-input
                class="textarea"
                type="textarea"
                :rows="20"
                placeholder="请输入邀请码，一行一个，输入错误的格式将无法格式化！"
                v-model="form.reCode"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getCoin">开始刷金币</el-button>
              <el-button
                type="danger"
                @click="
                  ;(form.encryptMobile = ''),
                    (form.reCode = ''),
                    (helpResTableData = [])
                "
              >清空</el-button>
            </el-form-item>
          </el-form>

          <!-- Result table -->
          <el-table :data="helpResTableData" border style="width: 100%">
            <el-table-column prop="index" label="索引"></el-table-column>
            <el-table-column prop="code" label="邀请码"></el-table-column>
            <el-table-column prop="msg" label="信息"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>提示</span>
        </div>
        <div class="text item">作者：SunSeekerX</div>
        <div class="text item">QQ: 1647800606</div>
        <div class="text item">论坛交流群: 172925124</div>
        <div class="text item">我的备用交流群：967946952</div>
        <div class="text item">大家和平使用，本系统仅用于学习开发！后续放上源码。</div>
        <div class="text item">如果我帮到了你，你可以请我喝杯一点点哦！</div>
        <div class="text item">
          <img class="income-images" src="@/assets/images/alipay.png" alt="支付宝" />
          <img class="income-images" src="@/assets/images/wechat.png" alt="微信" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 添加的code
        code: '',
        // 获取的code
        getCode: '',
        // 在线刷的code
        reCode: '',
        // 用户身份标识
        encryptMobile: '',
        // 总数
        count: 0
      },
      limit: 50,
      offset: 0,
      tableData: [],
      activeName: 'first',
      noMore: false,

      // 助力结果数组
      helpResTableData: [],

      // 正在运行标识
      isHelpNow: false
    }
  },
  methods: {
    // 添加code
    async onSubmit() {
      // return this.$notify({
      //   message: '暂时关闭添加功能',
      //   type: 'error'
      // })

      if (this.$util.trim(this.form.code)) {
        const codeArr = this.form.code.split('\n')
        const finalCodeArr = []
        const regStr = /([a-zA-Z0-9@-]{9})/
        for (let i = 0; i < codeArr.length; i++) {
          if (regStr.test(codeArr[i])) {
            finalCodeArr.push(codeArr[i])
          } else {
            this.$notify({
              message: `该code不正确:${codeArr[i]}`,
              type: 'error'
            })
          }
        }

        try {
          const res = await this.$api.Common.add({
            code: finalCodeArr
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

            // 总数
            this.form.count = res.data.count
          }

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
    },

    // 刷金币
    async getCoin() {
      if (!this.form.reCode) {
        return this.$notify({
          message: '请输入邀请码!',
          type: 'error'
        })
      } else if (!this.form.encryptMobile) {
        return this.$notify({
          message: '请输入用户标识!',
          type: 'error'
        })
      } else if (this.isHelpNow) {
        return this.$notify({
          message: '正在运行!',
          type: 'error'
        })
      }

      const regStr = /([a-zA-Z0-9@-]{9})/
      let reCode = this.form.reCode.split('\n')

      // 添加结果集
      this.isHelpNow = true
      for (let i = 0; i < reCode.length; i++) {
        if (regStr.test(reCode[i])) {
          try {
            const res = await this.$api.Common.friendHelp({
              code: reCode[i],
              encryptMobile: this.form.encryptMobile
            })
            // 检查助力结果
            if (res.respCode === '1000') {
              this.helpResTableData.push({
                index: i,
                code: reCode[i],
                msg: '助力结果：用户身份code失效，请重新获取'
              })
            } else if (res.respCode === '2500') {
              this.helpResTableData.push({
                index: i,
                code: reCode[i],
                msg: '助力结果：该用户已经获得奖品'
              })
            } else if (res.respCode === '2000') {
              this.helpResTableData.push({
                index: i,
                code: reCode[i],
                msg: '助力结果：无效邀请码'
              })
            } else if (res.respMsg) {
              this.helpResTableData.push({
                index: i,
                code: reCode[i],
                msg: `邀请码：${reCode[i]} , 助力结果： ${res.respMsg}`
              })
            } else {
              this.helpResTableData.push({
                index: i,
                code: reCode[i],
                msg: '助力结果：未知'
              })
            }
            // if (res.respMsg) {
            //   this.helpResTableData.push({
            //     index: i,
            //     code: reCode[i],
            //     msg: res.respMsg || '助力结果：未知'
            //   })
            // }
            console.log(res)
          } catch (e) {
            // Handle api request exception
            this.$handleError.handleApiRequestException(e)
          }
        } else {
          this.helpResTableData.push({
            index: i,
            code: reCode[i],
            msg: `该code无法使用${reCode[i]}`
          })
          console.log(`该code无法使用${reCode[i]}`)
        }
      }
      this.isHelpNow = false
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
    .box-card {
      margin-top: 10px;
      .text {
        line-height: 30px;
        .income-images {
          width: 50%;
        }
      }
    }
  }
}
</style>
