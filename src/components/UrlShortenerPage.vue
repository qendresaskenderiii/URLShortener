<template>
  <div class="full-container">
    <div class="sidebar-container">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="Logo" />
      </div>
      <div class="list-container">
        <div class="list-title">My shortened URLs</div>
        <div class="list-items">
          <div v-for="(item, key) in shortenedUrlsList" :key="key">
            <div class="list-item-container">
              <a
                :href="item.disabled ? null : item.shortenedUrl"
                target="_blank"
                :style="{ color: item.color }"
              >
                {{ item.shortenedUrl }}
              </a>
              <img src="../assets/trash.png" @click="removeLink(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="main-title">URL Shortener</div>
      <div class="input-container">
        <div class="flex-column">
          <input
            type="text"
            v-model="urlToShorten"
            placeholder="Paste the URL to be shortened"
          />
          <div class="error-msg" v-if="error">{{ error }}</div>
        </div>

        <select v-model="expirationTimestamp">
          <option value="0" disabled>Add expiration date</option>
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="3600">1 hour</option>
          <option value="18000">5 hours</option>
        </select>
      </div>
      <div class="btn-container" @click="getShortenedUrl">Shorten URL</div>
    </div>
  </div>
</template>

<script>
import { shortenUrl } from "../../services/shortenUrl";

export default {
  data() {
    return {
      urlToShorten: "",
      error: null,
      expirationTimestamp: 0,
      shortenedUrlsList: [],
    };
  },

  methods: {
    async getShortenedUrl() {
      try {
        const response = await shortenUrl(this.urlToShorten);

        const newItem = {
          shortenedUrl: response.result_url,
          delay: this.expirationTimestamp,
          color: "blue",
          disabled: false,
        };

        this.shortenedUrlsList.push(newItem);

        newItem.color = "blue";

        if (newItem.delay >= 60) {
          setTimeout(() => {
            const updatedItem = { ...newItem, color: "black", disabled: true };
            const index = this.shortenedUrlsList.indexOf(newItem);
            this.shortenedUrlsList.splice(index, 1, updatedItem);
          }, newItem.delay * 1000);
        }

        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }

      this.urlToShorten = "";
    },
    removeLink(item) {
      const index = this.shortenedUrlsList.indexOf(item);
      if (index !== -1) {
        this.shortenedUrlsList.splice(index, 1);
      }
    },
  },
};
</script>

<style>
#app {
  margin-top: 0 !important;
  color: black !important;
}

body {
  margin: 0 !important;
}

.full-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.logo-container img {
  width: 100%;
  height: 100%;
  max-width: 215px;
}

.sidebar-container {
  width: 30%;
  background: #efefef;
  height: 100%;
  padding: 40px 15px 0px 15px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-container {
  width: 100%;
  max-width: 215px;
  margin-top: 53px;
}

.list-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.main-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 80px 30px 0px 60px;
}

.main-title {
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 45px;
}

.input-container {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

input,
select {
  font-size: 19px;
  padding: 15px;
  color: grey;
}

.flex-column {
  width: 65%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
}

.flex-column input {
  width: calc(100% - 30px);
}
.input-container select {
  width: 30%;
}
.btn-container {
  background-color: purple;
  color: white;
  font-weight: 900;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
}

.btn-container:hover {
  background-color: #6c116c;
}

.list-item-container {
  display: flex;
  align-items: center;
  position: relative;
}

.list-item-container a {
  padding: 5px 0;
  cursor: pointer;
}

.list-item-container img {
  width: 15px;
  height: 15px;
  padding-left: 10px;
  position: absolute;
  right: -32px;
}
.error-msg {
  color: red;
  padding-top: 10px;
  position: absolute;
  bottom: -27px;
  padding-left: 5px;
}

.expired-link {
  color: black;
  font-weight: 700;
  pointer-events: none;
}

@media only screen and (max-width: 1040px) {
  .input-container {
    flex-direction: column;
  }

  .input-container select {
    width: 65%;
  }

  .list-container {
    max-width: 250px;
  }

  .list-item-container img {
    right: 0px;
  }

  .flex-column {
    width: 100%;
    margin-bottom: 35px;
  }

  .sidebar-container {
    width: 45%;
  }

  .main-container {
    margin: 70px 30px 0 30px;
  }
}

@media only screen and (max-width: 740px) {
  .sidebar-container {
    width: 55%;
  }

  .input-container select {
    width: 75%;
  }
}

@media only screen and (max-width: 645px) {
  .full-container {
    flex-direction: column-reverse;
  }

  .logo-container {
    position: absolute;
    top: 20px;
    right: 40px;
  }

  .logo-container img {
    max-width: 150px;
  }

  .main-container {
    margin: 0 auto;
    margin-top: 100px;
    height: 30%;
    max-height: 30%;
  }

  .main-container {
    width: 90%;
  }

  input,
  select {
    padding: 12px 10px;
  }

  .error-msg {
    bottom: -25px;
    font-size: 15px;
  }
  .main-title,
  .input-container {
    margin-bottom: 20px;
  }
  .sidebar-container {
    width: 90%;
    max-width: 90%;
    padding: 0;
    margin: 0 auto;
    margin-top: 50px;
    align-items: flex-start;
    margin-bottom: 20px;
    max-height: calc(70% - 180px);
    height: calc(70% - 180px);
  }

  .list-container {
    margin-top: 30px;
    max-width: 85%;
    padding-left: 30px;
    height: 100%;
  }

  .list-items {
    overflow-y: scroll;
    height: 80%;
    max-height: 80%;
  }
}
</style>
