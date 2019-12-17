/**
 * @name 
 * @author SunSeekerX
 * @time 2019-12-16 22:44:48
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-12-17 18:54:52
 */

import Vue from 'vue'

import {
  Button,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Notification,
  Card,
} from 'element-ui'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Card)

Vue.prototype.$notify = Notification
