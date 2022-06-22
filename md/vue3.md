1. 组个api setup
- 执行时间  setup 选项在组件被创建之前执行，一旦 props 被解析完成，它就将被作为组合式 API 的入口
- setup 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板
- ref 函数使任何响应式变量在任何地方起作用
```
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // 在 `mounted` 时调用 `getUserRepositories`
  watch(user, getUserRepositories)
  const twiceTheCounter = computed(() => counter.value * 2)
  return {
    repositories,
    getUserRepositories
  }
}
```

2. teleport拆分组件插入到指定元素下
```
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})
```
3. 片段 -> 局部根组件可以多个 基础样式使用v-bind="$attrs"指定
```
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```
4. 触发组件选项
   - 事件名监听 
    ```
    this.$emit('myEvent')
    <my-component @my-event='doSomething'></my-component>
    ```
   -  验证抛出的事件
    ```
     emits: {
       // 没有验证
       click: null,

       // 验证 submit 事件
       submit: ({ email, password }) => {
         if (email && password) {
           return true
         } else {
           console.warn('Invalid submit event payload!')
           return false
         }
       }
     },
     methods: {
       submitForm(email, password) {
         this.$emit('submit', { email, password })
       }
     }
    ```
    - v-model 参数 默认情况下，组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件
    ```
    <my-component v-model:title="bookTitle"></my-component>

    app.component('my-component', {
     props: {
       title: String
     },
     emits: ['update:title'],
     template: `
       <input
         type="text"
         :value="title"
         @input="$emit('update:title', $event.target.value)">
     `
   })
    ```
5. 单文件组件 <script setup> 默认就就是async声明
    - 基本用法
      ```
         <script setup>
         import { ref } from 'vue'
         import MyComponent from './MyComponent.vue'  // 使用组件

         const count = ref(0) // 响应式

         </script>

         <template>
             <MyComponent />
             <button @click="count++">{{ count }}</button>
         </template>
      ```
    - 自定义指令
        ```
        <script setup>
        const vMyDirective = {
          beforeMount: (el) => {
            // 在元素上做些操作
          }
        }
        </script>
        <template>
          <h1 v-my-directive>This is a Heading</h1>
        </template>
        ```
    - defineProps和defineEmits 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits
        ```
        <script setup>
        const props = defineProps({
          foo: String
        })

        const emit = defineEmits(['change', 'delete'])
        // setup code
        </script>
        ```
    - defineExpose
      - 概念 使用 <script setup> 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。为了在 <script setup> 组件中明确要暴露出去的属性
      - 实例
        ```
        <script setup>
        import { ref } from 'vue'

        const a = 1
        const b = ref(2)

        defineExpose({
          a,
          b
        })
        </script>
        ```
6. style
    - scoped
      父组件的样式将不会泄露到子组件当中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响。这是有意为之的，这样父组件就可以设置子组件根节点的样式，以达到调整布局的目的
    - 深度选择器
      处于 scoped 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 :deep() 这个伪类
      ```
      <style scoped>
        .a :deep(.b) {
          /* ... */
        }
      </style>
      ```
    - 插槽选择器
        默认情况下，作用域样式不会影响到 <slot/> 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 :slotted 伪类以确切地将插槽内容作为选择器的目标
    ```
    <style scoped>
      :slotted(div) {
        color: red;
      }
      </style>
    ```
    - 全局选择器
        如果想让其中一个样式规则应用到全局，比起另外创建一个 <style>，可以使用 :global 伪类来实现
    ```
    <style scoped>
      :global(.red) {
        color: red;
      }
    </style>
    ```
7. v-if 与 v-for 的优先级对比 3.x 版本中 v-if 总是优先于 v-for 生效
8. destroyed 生命周期选项被重命名为 unmounted、beforeDestroy 生命周期选项被重命名为 beforeUnmount
9. 强烈建议使用 emits 记录每个组件所触发的所有事件。
这尤为重要，因为我们移除了 .native 修饰符。任何未在 emits 中声明的事件监听器都会被算入组件的 $attrs，并将默认绑定到组件的根节点上
```
   // 对于向其父组件透传原生事件的组件来说，这会导致有两个事件被触发：
   <template>
     <button v-on:click="$emit('click', $event)">OK</button>
   </template>
   <script>
   export default {
     emits: [] // 不声明事件
   }
   </script>
   // 当一个父级组件拥有 click 事件的监听器时：
   <my-button v-on:click="handleClick"></my-button>
   该事件现在会被触发两次:
   一次来自 $emit()。
   另一次来自应用在根元素上的原生事件监听器。
```