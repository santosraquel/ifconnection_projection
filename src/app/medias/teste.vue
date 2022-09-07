<template>

  <div class="container">
    <!-- <img :src="items[0]"/> -->
  </div>
    <!-- <v-carousel
      cycle
      :show-arrows="false"
      hide-delimiters
      style="height:100%"
    >   
    <v-carousel
        height="100%"
      >    
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        class="container"
      >
        <img
          :src="item"
          alt=""
          width="100%"
          class="img"
        >
      </v-carousel-item> 
    </v-carousel> -->



      <!-- <v-carousel
      height="100%"
      cycle
      :interval="item"
      :show-arrows="false"
      hide-delimiters
    >    
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        class="container"
      >
        <img
          :src="item.src"
          alt=""
          width="100%"
          class="img"
        >
        <video v-if="item.type === 'video'" width="100%" height="100%" autoplay="autoplay">
          <source :src="item.src" type="video/mp4">
        </video> 
      </v-carousel-item> 
    </v-carousel>  -->
</template>

<script>
import { getDownloadUrl, upload } from "@/firebase/storage";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { Media } from "./Media";
import { mediasService } from "./MediasService";

export default {
    data: () => ({
        items: [
           // {
          //   type: 'image', 
          //   src: 'https://firebasestorage.googleapis.com/v0/b/if-connection.appspot.com/o/medias%2FassistenciaEstudantil.png?alt=media&token=3881382a-f0e3-43f9-b85a-6a74a1d1003d',
          //   description: 'Assistência Estudantil IFPR',
          //   duration: 20000
          // },
          // {
          //   type: 'video', 
          //   src:  'https://firebasestorage.googleapis.com/v0/b/if-connection.appspot.com/o/medias%2FCoro%20Juvenil%20do%20Instituto%20Federal%20do%20Paran%C3%A1%20%E2%80%93%20Campus%20Paranava%C3%AD.%20M%C3%BAsica-%20Amarelo%2C%20Azul%20e%20Branco.mp4?alt=media&token=34f8d6b8-8d3d-4b20-a24f-0ee1c209f6b4',
          //   description: 'Video IFPR',
          //   duration: 212000
          // },
          // {
          //   type: 'image', 
          //   src: 'https://firebasestorage.googleapis.com/v0/b/if-connection.appspot.com/o/medias%2Fviolencia.jpg?alt=media&token=8ab0b748-c885-4234-8f65-b5e7013f8edb',
          //   description: 'Violência',
          //   duration: 20000
          // },
          // {
          //   type: 'image', 
          //   src: 'https://firebasestorage.googleapis.com/v0/b/if-connection.appspot.com/o/medias%2FprocessoSeletivoIFPR.png?alt=media&token=742832f9-9bc4-4baa-adf6-6a984e62947f',
          //   description: 'Processo Seletivo IFPR',
          //   duration: 20000
          // },
        ],      
        target: {},
    }),

    beforeCreate () {
      this.Model = Media
      this.$service = mediasService
    },


    async created(){
      const storage = getStorage();

          console.log('Items: ', this.items)
      // Create a reference under which you want to list
      const listRef = ref(storage, 'medias');
      console.log('listRef', listRef);
      // Find all the prefixes and items.
      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            console.log('folderRef', folderRef);
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
          });
          res.items.forEach((itemRef) => {
            console.log('itemRef', itemRef);
            // All the items under listRef.


          // Create a reference to the file we want to download
            const starsRef = ref(storage, `medias/${itemRef.name}`);

            // Get the download URL
            getDownloadURL(starsRef)
              .then((url) => {
                this.items.push(url);
                console.log('URL', url);
                // Insert url into an <img> tag to "download"
              })
              .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;

                  // ...

                  case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
              }); 
          });
        }).catch((error) => {
          console.log('error', error);
          // Uh-oh, an error occurred!
        });      
    },
}

// computed:{
//       current(){
//         this.medias = this.items.map((item) => {
//           return item.src
//         })
//         console.log('current: ', this.medias)
//         return this.media
//       }
//     },

//     methods: {
//       nextMedia(){
//         // this.medias[this.currentMediaIndex].classList.remove('image')
//         this.current
//         let cont = 0
//         while (cont < this.time) {
    //       if(cont === 20000){
    //         cont = 0
    //       }
    //       cont ++
    //       // console.log('cont: ', cont)
          
    //     }
    //     this.currentMediaIndex++
    //     if(this.currentMediaIndex >= this.maxMedias){
    //       this.currentMediaIndex = 0
    //     }
    //     console.log('current media index:', this.currentMediaIndex)
    //     // this.medias[this.currentMediaIndex].classList.add('image')
    //   }
    // },

    // async created(){
    //   this.maxMedias = this.items.length
    //   console.log('max medias:', this.maxMedias)
    //   setInterval(() => {
    //       this.nextMedia()
    //     }, this.time)
    // },



    methods: {
      nextMedia(){
        let cont  = 0
        while(cont < this.maxMedias){
          for(const item in this.items ){
            this.time = this.items[this.currentMediaIndex].duration
            this.media = this.items[this.currentMediaIndex].src
          }
          cont++
        }
        this.currentMediaIndex++
        console.log(this.currentMediaIndex)
        console.log('media: ', this.media)
        if(this.currentMediaIndex >= this.maxMedias){
          this.currentMediaIndex = 0
        }
        // let cont = 0
        // while (cont < this.time) {
        //   if(cont === 20000){
        //     cont = 0
        //   }
        //   cont ++
        //   // console.log('cont: ', cont)
          
        // }
        console.log('current media index:', this.currentMediaIndex)
      }
    },

    async created(){
      this.maxMedias = this.items.length
      console.log('max medias:', this.maxMedias)
      setInterval(() => {
          this.nextMedia()
        }, this.time)
    },
</script>

<style scoped lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  margin: 0;
}

.container{
  width: 100vw;
  height: 100vh;
  background-color: black;

}

.section{
 position: relative !important;
 width: 100% !important;
 height: 100% !important;  
}

.section,.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  background-size: cover;
}

.container{
  background-size: cover;
}

</style>