<template>
  <section>
    <ui>
      <li v-for="(todoItem,index) in propsdata" :key="todoItem" class="shadow">
        <!-- <li v-for="(todoItem,index) in todoItems" :key="todoItem" class="shadow"> -->
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{todoItem}}
        <span
          class="removeBtn"
          type="button"
          @click="removeTodo(todoItem, index)"
        >
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </ui>
  </section>
</template>

<script>
export default {
  props: ["propsdata"],
  //   data() {
  //     return {
  //       todoItems: []
  //     };
  //   },
  //   created() {
  //     if (localStorage.length > 0) {
  //       for (var i = 0; i < localStorage.length; i++) {
  //         this.todoItems.push(localStorage.key(i));
  //       }
  //     }
  //   },
  methods: {
    //App.vue 로 이벤트 전달
    removeTodo(todoItem, index) {
      //하위 컴포넌트에서 이벤트를 발생시켜 상위 컴포넌트로 신호를 보낼 떄 $emit('이벤트이름', '인자1', '인자2')
      this.$emit("removeTodo", todoItem, index);
    }
  }
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
