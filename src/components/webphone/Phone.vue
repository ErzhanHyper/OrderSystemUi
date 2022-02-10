<template>
    <div>
        <div class="phone_block webphone"  >


        <div class="tabs_block" >
        <div class="keyboard tab_block" >
            <div class="number_field">
                <v-text-field label="Введите номер телефона..."  counter maxlength="16"></v-text-field>
                <v-btn class="delete"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
            </div>
            <div class="number_buttons">
                <div class="button_group" >
                    <v-btn class="btn" v-for="index in 9" :key="index"><span v-if="index > 0">{{index}}</span></v-btn>
                    <v-btn class="btn" >*</v-btn>
                    <v-btn class="btn" >0</v-btn>
                    <v-btn class="btn" >#</v-btn>
                </div>
            </div>
            <v-btn class="btn success call_button" elevation="4" icon rounded ><v-icon color="white">mdi-phone</v-icon></v-btn>
        </div>

    </div>

        <div class="tabs_buttons" >
            <div class="tab_button tab1" ><v-icon>mdi-dialpad</v-icon><span>Клавиши</span></div>
            <div class="tab_button tab2" ><v-icon>mdi-cellphone-android</v-icon><span>Текущий вызов</span></div>
            <div class="tab_button tab3" ><v-icon>mdi-history</v-icon><span>Недавние</span></div>
        </div>


    </div>
    </div>
</template>


<style scoped lang="scss">


    .phone_block .keyboard {
    display: flex;
    flex-direction: column;
    padding-top: 10px;

    .v-input {
        margin: 0 !important;
        padding: 0 !important;
    }

    .v-input__control {
        .v-text-field__details {
            display: none;
        }
    }
}


.tabs_block {
    height: 320px;
    overflow: hidden;
    .history {
        overflow-y: scroll;
        max-height: 100%;
        margin-right: -20px;
        margin-top: -10px;

        .history_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            border-bottom: 1px solid #dddddd;
            padding-bottom: 25px;
            margin-bottom: 16px;

            .v-icon {
                position: absolute;
                left: 0;
                top: 0;
            }

            padding-left: 30px;

            .type {
                position: absolute;
                left: 30px;
                top: 25px;
                font-size: 12px;
            }

            .datetime {
                color: #606060;
                font-size: 14px;
                margin-right: 10px;
            }
        }
    }

    .current_call {
        .buttons {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;

            button {
                margin: 6px;
                background: #f2f2f2;
            }
        }
    }
}

.webphone {
    width: 226px;
    padding: 30px 20px 0px 20px;
    box-shadow: 0 0px 4px 2px rgba(0, 0, 0, 0.2);
    z-index: 10;
    position: fixed;
    background: #fefefe;
    right:0px;
    top: 38px !important;
    border-radius: 6px;
    max-height: calc(100vh - 80px);
    overflow-x: hidden;
    margin-left: calc(100% - 265px);

    &.active {
        right: 300px;
        left: inherit !important;
    }


    .call_button {
        width: 40px !important;
        height: 40px !important;
        border-radius: 100%;
        margin: 10px auto !important;
    }

    .delete {
        background: none !important;
        min-width: 14px !important;
        height: 14px !important;
        box-shadow: none !important;
        padding: 0 !important;
        position: absolute;
        right: -4px;
        top: 10px;
    }

    .number_field {
        display: flex;
        align-items: center;
        text-align: center;
        position: relative;
    }

    .number_buttons {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;
        justify-content: center;

        .btn {
            border-radius: 20px;
            height: 40px !important;
            padding: 0 !important;
            min-width: 40px !important;
            margin: 4px 10px 4px 10px !important;
        }

        .button_group {
            display: flex;
            align-items: center;
            // flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
}

.webphone img {
    width: 100%;
}

.tabs_buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #dddddd;
    left: -20px;
    position: relative;
    width: calc(100% + 40px);
    border-bottom: 1px solid #dddddd;

    .tab_button {
        font-size: 10px;
        text-align: center;
        border-radius: 2px;
        padding: 5px;
        cursor: pointer;

        &:hover,
        &.active {
            color: #88b98a;
        }

        span {
            display: block;
        }
    }
}

.ext_status {
    .point {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
        float: left;
        margin: 4px 4px 0 0;

        &.success {
            background: #88b98a;
        }

        &.error {
            background: #ef7270;
        }
    }

    font-size: 12px;
    margin-top: 10px;
}


.redirect_form {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 10;
    height: 380px;
    left: 0;

    .back {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px;
        cursor: pointer;

        &:hover {
            color: #6a9ce8;
        }
    }

    .form-title {
        display: block;
        padding-bottom: 10px;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

</style>
