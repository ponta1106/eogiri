<template>
  <div id="contact-page">
    <div class="container mx-auto w-11/12 h-full p-3 flex flex-col justify-around overflow-auto text-center">
      <div class="container p-2">
        <h3>お問合せ</h3>
        <div class="adimin-icon">
          <img
            src="../../assets/turtle.png" alt="icon"
            class="h-24 mx-auto">
        </div>
        <div class="message mb-5">
          <p>こんにちは、このサイトの管理人ぽんたです。</p>
          <p>このアプリについて、ご意見ご要望などありましたら、<br>私のTwitterまでご連絡ください。</p>
        </div>
        <div class="contact">
          <button
            class="my-2 py-2 px-4 bg-blue-400 text-white rounded"
            @click="contactAdmin"
          >
            管理人のTwitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  methods: {
    contactAdmin() {
      //シェアする画面を設定
      var shareURL = 'https://twitter.com/ponta_1106';
      //シェア用の画面へ移行
      window.open(shareURL, '_blank')
    }
  }
}
</script>
