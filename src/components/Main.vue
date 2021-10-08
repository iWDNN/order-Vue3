<template>
  <div
    class="container"
    :style="{ 'margin-left': navWidth}">
    <div class="main-header fa">
      <div class="box-one">
        <h1 class="title">
          ORDER
        </h1>
      </div>
      <div class="box-two fa">
        <button
          @click="logout"
          class="main-btn">
          <span>로그아웃</span>
        </button>
      </div>
    </div>
    <header class="header fa">
      <div class="title fcc">
        <h1>대시보드</h1>
      </div>
    </header>
    <section class="sub-section">
      <div class="box-one">
        <div class="user-info">
          <div
            v-if="store.storeStatus=='VALID'"
            class="verified fa">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp.png"
              alt="" />
            <span>식당 인증 완료</span>
          </div>
          <div
            v-if="store.storeStatus=='INVALID'"
            class="verified fa">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp%20(1).png"
              alt="" />
            <span class="verified-waiting">식당 인증 확인중</span>
          </div>
          <div
            v-if="store.storeStatus==null"
            class="verified fa">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp%20(4).png"
              alt="" />
            <span class="verified-waiting">식당 미생성</span>
          </div>
          <div class="residence fa">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_place_black_24dp.png"
              alt="" />
            <span v-if="userInfo.address">{{ userInfo.address }}</span>
          </div>
          <div class="username">
            <h1>{{ userInfo.username }}</h1>
          </div>
          <div class="realname">
            <h2>{{ userInfo.name }}</h2>
          </div>
          <div class="phone fa">
            <img
              src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_smartphone_black_24dp%20(1).png"
              alt="" />
            <span>+82 () {{ userInfo.phoneNum }}</span>
          </div>
        </div>
      </div>
      <div class="box-two">
        <div class="store-info">
          <h1 class="title fa">
            <div
              v-if="store.storeStatus=='VALID'"
              class="verified fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp.png"
                alt="" />
            </div>
            <div
              v-if="store.storeStatus=='INVALID'"
              class="verified fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp%20(1).png"
                alt="" />
            </div>
            <div
              v-if="store.storeStatus==null"
              class="verified fcc">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_verified_user_black_24dp%20(4).png"
                alt="" />
            </div>
            <span>식당 정보</span>
          </h1>
          <div
            v-if="store.storeStatus=='VALID'||store.storeStatus=='INVALID'"
            class="info">
            <div class="line">
              <div class="line-title">
                식당명
              </div>
              <div class="line-info">
                {{ store.name }}
              </div>
            </div>
            <div class="line">
              <div class="line-title">
                설명 :
              </div>
              <div class="line-info">
                {{ store.description }}
              </div>
            </div>
            <div class="line">
              <div class="line-title">
                사업자등록증 :
              </div>
              <div 
                v-if="store.licenseImage"
                :style="{ backgroundImage:`url(${store.licenseImage})` }"></div>
            </div>
          </div>
          <div
            v-if="store.storeStatus==null"
            class="store-reg fcc">
            <h1 class="fcc">
              <span>식당 등록</span>
            </h1>
            <h2 class="notice fa">
              <img
                src="https://raw.githubusercontent.com/iWDNN/temp/master/outline_warning_black_24dp.png"
                alt="" />
              <span>식당을 생성해야 서비스를 이용할 수 있습니다!</span>
            </h2>
            <form @submit.prevent="submitResForm">
              <div class="line">
                <label for="name">식당명</label>
                <input
                  id="name"
                  v-model="name"
                  placeholder="식당명"
                  type="text" />
              </div>
              <div class="line">
                <label for="description">설명</label>
                <input
                  id="description"
                  v-model="description"
                  placeholder="설명"
                  type="text" />
              </div>
              <div class="line">
                <label for="licenseImage">사업자등록증</label>
                <input
                  id="licenseImage"
                  v-model="licenseImage"
                  placeholder="사업자등록증 url(임시)"
                  type="text" />
              </div>
              <div class="btn-group fcc">
                <button
                  type="submit"
                  class="btn ">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import { mapState } from 'vuex'
export default {
  created(){
    this.$store.dispatch('login/getMemberInfo')
    this.$store.dispatch('restaurant/getStore')
  },
  data(){
    return{
      name:'',
      description:'',
      licenseImage:''
    }
  },
  computed:{
    ...mapState('status',[
      'collapsed',
      'navWidth',
    ]),
    ...mapState('restaurant',[
      'store',
    ]),
    ...mapState('login',[
      'userInfo',
    ]),
    
  },
  methods:{
    logout(){
      this.$store.dispatch('login/logOut')
    },
    submitResForm(){
      const data = {
        name:this.name,
        description:this.description,
        licenseImage:this.licenseImage,
      }
      this.$store.dispatch('restaurant/regRes',data)
      this.$router.go()
    },
    test(){
    }
    
  }
}
</script>
<style lang="scss" scoped>
.container{
  .main-header{
    width:100%;
    height:55px;
    box-sizing: border-box;
    padding:0 10px;
    .box-one{
      width:50%;
      .title{
        font-family: "Oswald", sans-serif;
        font-weight: 700;
        font-size:25px;
        color:darken($m6, 2%);
      }
    }
    .box-two{
      width:50%;
      justify-content: flex-end;
      .main-btn{
        width:100px;
        height:30px;
        border:none;
        background-color:darken(#F0F5FB,3%);
        border-radius:15px;
        box-shadow:0 7px 25px rgba(0,0,0,0.08);
        span{
          color:lighten($m4,50%);
          font-size:12px;
        }
      }
    }
  }
  .header{
    .title{
      height:100%;
      h1{
        margin-left:20px;
        font-weight: 700;
        font-size:25px;
        color:$m2;
      }
    }
  }
  .sub-section{
    width:100%;
    height:100%;
    display:flex;
    flex-wrap:wrap;
    margin-left:1px;
    .box-one{
      width:255px;
      height:100%;
      background-color:$m5;
      border-radius:15px;
      box-shadow:0 7px 25px rgba(0,0,0,0.08);
      margin-left:1px;
      .user-info{
        width:100%;
        height:100%;
        padding:25px;
        .residence{
          margin-bottom:10px;
          img{
            width:20px;
            height:20px;
          }
          span{
            color:#c3cce0;
            margin-top:4px;
            font-size:12px;
          }
        }
        .username{
          margin-bottom:10px;
          margin-left:2px;
          h1{
            font-size:20px; 
          }
        }
        .realname{
          margin-bottom:16px;
          margin-left:2px;
          h2{
            font-size:15px;
            color:lighten($m4,30%);
          }
        }
        .phone{
          margin-bottom:16px;
          img{
            width:25px;
            height:25px;
          }
          span{
            font-size:14px;
            margin-top:7px;
            color:#A7AAB4;
          }
        }
        .verified{
          margin-bottom:20px;
          img{
            width:22px;
            height:22px;
          }
          span{
            margin-top:6px;
            margin-left:5px;
            font-size:14px;
            font-weight: 500;
            color:#23c2a4;
            &.verified-waiting{
              color:$m4;
            }
          }
        }
      }
    }
    .box-two{
      min-width:50%;
      background-color:$m5;
      border-radius:15px;
      box-shadow:0 7px 25px rgba(0,0,0,0.08);
      margin-left:11px;
      float:right;
      flex-grow:1;
      .store-info{
        padding:10px 20px;
        .title{
          width:100%;
          height:40px;
          .verified{
            img{
              width:25px;
              height:25px;
              margin-right:10px;
            }
          }
          span{
            margin-top:2px;
            font-weight: 700;
            font-size:18px;
          }
        }
        .info{
          display:flex;
          margin-top:20px;
          .line{
            width:100%;
            height:80px;
            margin:0 15px;
            padding:20px;
            border-radius: 20px;
            box-shadow:0 7px 30px rgba(0,0,0,0.04);
            .line-title{
              font-size:14px;
              color:#9E9FBA;
              font-weight:600;
              margin-bottom:15px;
            }
            .line-info{
              font-size:22px;
              font-weight: 600;
            }
            
          }
        }
        .store-reg{
          width:100%;
          padding:10px;
          box-shadow:0 7px 30px rgba(0,0,0,0.04);
          border-radius: 15px;
          flex-direction: column;
          h1{
            width:100%;
            height:50px;
            span{
              font-size:16px;
              font-weight: 600;
            }
          }
          .notice{
            margin-bottom:20px;
            img{
              width:20px;
              height:20px;
            }
            span{
              font-size:12px;
            }
          }
          form{
            .line{
              position:relative;
              margin:10px 0;
              label{
                position:absolute;
                font-size:12px;
                top:-3px;
                left:13px;
                background-color:$white;
                padding:0 3px;
              }
              input{
                width:250px;
                height:37px;
                padding-left:10px;
                outline-color:$m2;
                border:2px solid $gray-400;
                border-radius:15px;
                font-size:12px;
                background-color:$m5;
                &::placeholder{
                  font-size:12px;
                  color:$gray-400;
                }
              }
            }
          }
        }
      }
    }
  }
  
}
</style>
