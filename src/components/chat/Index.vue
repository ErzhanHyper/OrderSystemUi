<template>
  <div>
    <v-form id="main_chat">

      <div class="chats">

        <div class="chat">
          <div class="user">User 1</div>
          <div class="message">Message 1</div>
        </div>

         <div class="chat current">
          <div class="user">User 1</div>
          <div class="message">Можно добавить отправку файла</div>
        </div>

      </div>

      <div class="actions">
        <v-text-field
        v-model="chat.message"
        :counter="40"
        label="Сообщения"
        required
        outlined
        dense
        >
        </v-text-field>
        <v-btn color="accent"><v-icon >mdi-send</v-icon></v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>

export default{

  data:() => ({
    chat: {
      message: 'test',
    }
  }),

}

</script>


<style scoped lang="scss">

#main_chat{
  width:400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 3px;
  position: fixed;
  top: 35px;
  right: 5px;
  box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
  padding:8px;
  justify-content: space-between;
  .actions{
    display: flex;
    align-items: center;
    margin-top:10px;
    margin-bottom: -10px;
    button{
      margin-left: 4px;
      margin-top: -26px;
    }
  }

  .chats{
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .chat{
      padding: 5px;
      background: #e8dbe863;
      border-radius: 4px;
      margin-bottom: 5px;
      width: 80%;
      &.current{
        align-self: flex-end;
        background: #aed6ae21;
        text-align: right;
      }
      .message{
        font-size: 14px;
      }
      .user{
        font-weight: 600;
      }
    }
  }
}

</style>
