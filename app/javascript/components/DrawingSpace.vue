<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-modalbg flex items-center justify-around z-10"
    >
    <div
      id="drawing-space"
      class="w-5/6 h-5/6 absolute">
      <h1
        id="drawing-space-title"
        class="bg-orange-default text-dark-default p-2 flex justify-between"
      >
      {{ currentTheme }}
      <span
        class="bg-dark-default text-orange-default px-2 cursor-pointer"
        @click="closeModal"
      >閉じる</span>
      </h1>
      <canvas
        id="myCanvas"
        :class="{ eraser: canvasMode === 'eraser' }"
        class="bg-white"
        @mousedown="dragStart"
        @mouseup="dragEnd"
        @mouseout="dragEnd"
        @mousemove="draw"
      >このブラウザは HTML5 Canvas に対応していません。</canvas>
      <div
        id="drawing-space-menus"
        class="bg-orange-default text-dark-default p-2"
      >
        <div class="flex justify-between">
          <button id="pen-black-button" @click="penBlack">ペン(黒)</button>
          <button id="pen-red-button" @click="penRed">ペン(赤)</button>
          <button id="pen-blue-button" @click="penBlue">ペン(青)</button>
          <button id="eraser-button" @click="eraser">消しゴム</button>
          <button id="clear-button" @click="clear">クリア</button>
        </div>
        <span>ペンの太さ : {{ penWidth }}</span>
        <input type="range" list="tickmarks" min="1" max="100" step="1" v-model.number="penWidth" @change="changePenWidth">
        <span>消しゴムの太さ : {{ eraserWidth }}</span>
        <input type="range" list="tickmarks" min="1" max="100" step="1" v-model.number="eraserWidth" @change="changeEraserWidth">
        <button id="download-button" @click="download">ダウンロード</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawingSpace',
  props: {
    currentTheme: {
      type: String,
    },
  },
  data() {
    return {
      canvasMode: 'penBlack',
      canvas: null,
      context: null,
      penWidth: 1,
      eraserWidth: 1,
      isDrag: false,
      isVisible: false,
    };
  },
  mounted() {
    this.canvas = document.querySelector('#myCanvas')
    this.drawingSpace = document.getElementById('drawing-space')
    this.drawingSpaceTitle = document.getElementById('drawing-space-title')
    this.drawingSpaceMenu = document.getElementById('drawing-space-menus')
    this.canvas.width = this.drawingSpace.clientWidth
    this.canvas.height = this.drawingSpace.clientHeight - this.drawingSpaceTitle.clientHeight - this.drawingSpaceMenu.clientHeight
    this.context = this.canvas.getContext('2d')
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = this.penWidth;
    this.context.strokeStyle = 'rgba(100, 100, 100, .1)';
  },
  methods: {
    closeModal() {
      this.$emit("closeDrawingSpace");
    },
    changePenWidth() {
      this.context.lineWidth = this.penWidth;
    },
    changeEraserWidth() {
      this.context.lineWidth = this.eraserWidth;
    },
    // ペンモード(黒)
    penBlack() {
      this.canvasMode = 'penBlack';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(100, 100, 100, .1)';
    },
    // ペンモード(赤)
    penRed() {
      this.canvasMode = 'penRed';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(200, 100, 100, .1)';
    },
    // ペンモード(青)
    penBlue() {
      this.canvasMode = 'penBlue';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(100, 100, 200, .1)';
    },
    eraser() {
      this.canvasMode = 'eraser';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.eraserWidth;
      this.context.strokeStyle = 'rgba(255, 255, 255, 1)';
    },
    download() {
      let link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/png");
      link.download = 'Eogiri-' + new Date().getTime() + '.png';
      link.click();
    },
    // 描画
    draw(e) {
      var x = e.layerX
      var y = e.layerY - this.drawingSpaceTitle.clientHeight
      if(!this.isDrag) {
        return;
      }
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画開始(mousedown)
    dragStart(e) {
      var x = e.layerX
      var y = e.layerY - this.drawingSpaceTitle.clientHeight
      this.context.beginPath();
      this.context.lineTo(x, y);
      this.context.stroke();
      this.isDrag = true;
    },
    // 描画終了(mouseup, mouseout)
    dragEnd() {
      this.context.closePath();
      this.isDrag = false;
    },
    // クリア
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
};
</script>