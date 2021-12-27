<template>
  <div class="main_container">
    <div class="tag_list_container">
      <div class="tag_title">태그 목록</div>
      <div class="tag_line"></div>
      <div>
        <ol>
          <li
            class="tag_itme"
            v-for="(item, index) in tagList"
            :key="index"
            @click="onTagItem(item)"
          >
            <span :class="item.selectClass" class="tag_name">{{
              item.name
            }}</span>
            <span class="tag_item">({{ item.count }})</span>
          </li>
        </ol>
      </div>
    </div>
    <div class="list_container">
      <div class="list_block" v-if="listData.length == 0">
        <div class="content_block">
          <div>
            <p class="title_content">글을 작성하세요</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="list_block"
          v-for="(item, index) in listData"
          :key="index"
          @click="gotoDetailInfo(item)"
        >
          <div class="tag_value">
            <p>
              <span class="tag_bar">{{ item.name }}</span>
            </p>
          </div>
          <div class="content_block">
            <div>
              <p class="title_content">{{ item.title }}</p>
            </div>
            <div class="title_date_block">
              <p>{{ item.created }}</p>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CommonMixin } from "@/mixins/CommonMixin.js";
export default {
  mixins: [CommonMixin],
  created() {
    this.getList(0);
    this.getTagList();
  },
  data() {
    return {
      listData: [],
      tagList: [],
    };
  },

  methods: {
    getTagList() {
      axios
        .get(this.HOST_ADD + "tagList")
        .then((response) => {
          console.log("response", response);
          this.tagList.push({
            name: "전체",
            count: response.data.totalCount,
            id: "0",
          });

          response.data.tagList.forEach((item) => {
            this.tagList.push({
              name: item.name,
              count: item.count,
              id: item.id,
              selectClass: "",
            });
          });
          this.onTagItem(this.tagList[0]);
        })
        .catch((error) => {
          this.showToastError(error);
        });
    },
    getList(tagID) {
      axios.get(this.HOST_ADD + "boardList/" + tagID).then((response) => {
        console.log("boardList", response.data);
        this.listData = response.data;
      });
    },
    onTagItem(item) {
      this.tagList.forEach((tagItem) => {
        if (tagItem.id == item.id) {
          tagItem.selectClass = "tag_name_select";
        } else {
          tagItem.selectClass = "";
        }
      });
      this.getList(item.id);
    },
    gotoDetailInfo(item) {
      this.$router.push({
        name: "BlogListDetail",
        params: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.main_container {
  display: flex;
  justify-content: center;

  .list_container {
    display: flex;
    flex-direction: column;
    padding: 20px;

    .list_block {
      width: 700px;
      padding: 15px;

      .content_block {
        display: flex;
        margin-bottom: 10px;

        p {
          margin: 5px;
        }

        .title_content {
          width: 560px;
          font-size: 30px;
          font-weight: bolder;
          cursor: pointer;
        }

        .title_date_block {
          width: 220px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .tag_bar {
        background-color: rgb(26, 188, 156);
        border-radius: 4px;
        padding: 2px;
        font-weight: bolder;
        color: white;
      }
    }
  }

  .tag_list_container {
    width: 150px;
    padding: 20px 0 0 0;

    .tag_title {
      padding: 3px;
      font-weight: bold;
    }

    .tag_line {
      border: solid rgb(144, 144, 144);
      border-width: 0 1px 1px 0;
    }

    ol {
      margin: 0px;
      padding: 10px;

      li {
        list-style: none;
        margin-bottom: 10px;

        .tag_name {
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        .tag_name_select {
          color: rgb(26, 188, 156);
          font-weight: bold;
        }

        .tag_item {
          margin-left: 4px;
        }
      }
    }
  }
}

.line {
  background-color: rgb(26, 188, 156);
  border: solid rgb(26, 188, 156);
  border-width: 0 1px 1px 0;
}
</style>
