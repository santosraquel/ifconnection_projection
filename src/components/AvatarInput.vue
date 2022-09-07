<template>
    <div class="personal-image">
        <label class="label">
            <input 
                type="file"
                accept="image/*"
                ref="file"
                @change="change"/>
            <figure class="personal-figure">
                <img :src="src" alt="Avatar" class="personal-avatar">
                <figcaption class="personal-figcaption">
                    <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png">
                </figcaption>
            </figure>
        </label>
    </div>
</template>

<script>

export default {
  props: {
    value: File,
    defaultSrc: String,
  },
  watch: {
    value(file) {
      if (!file) {
        this.src = this.defaultSrc;
        this.$refs.file.value = "";
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.src = e.target.result;
        };
      }
    },
  },
  data() {
    return {
      src: this.defaultSrc,
    };
  },
  methods: {
    browse() {
      this.$refs.file.click();
    },
    remove() {
      this.$emit("input", null);
    },
    change(e) {
      this.$emit("input", e.target.files[0]);
    },
  },
}
</script>

<style lang="scss" scoped>

.personal-image {
  text-align: center;
  margin-left: 40% !important;
}
.personal-image input[type="file"] {
  display: none;
}
.personal-figure {
  position: relative;
  width: 100px;
  height: 100px;
}
.personal-avatar {
  cursor: pointer;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 2px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out .3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.personal-figcaption {
  cursor: pointer;
  position: absolute;
  top: 0px;
  width: inherit;
  height: inherit;
  border-radius: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: all ease-in-out .3s;
}
.personal-figcaption:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, .5);
}
.personal-figcaption > img {
  margin-top: 35px;
  width: 30px;
  height: 30px;
}
</style>