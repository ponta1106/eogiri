<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen  bg-modalbg flex items-center justify-around z-10"
    >
    <div
      id="drawing-space"
      class="absolute top-0 left-0 w-full h-full">
      <h3
        id="drawing-space-title"
        class="bg-orange-default text-dark-default p-2 flex justify-between"
      >
      お題 「{{ title }}」
        <span
          class="bg-dark-default text-orange-default px-2 cursor-pointer text-sm"
          @click="closeModal"
        >閉じる</span>
      </h3>
      <canvas
        id="myCanvas"
        class="bg-white"
        @mousedown="dragStart"
        @touchstart="touchStart"
        @mouseup="dragEnd"
        @mouseout="dragEnd"
        @touchend="dragEnd"
        @touchleave="dragEnd"
        @mousemove="draw"
        @touchmove="touchMove"
      >このブラウザは HTML5 Canvas に対応していません〜 T_T</canvas>
      <div
        id="drawing-space-menus"
        class="bg-orange-default text-dark-default p-2 md:flex"
      >
        <div class="flex mb-2 md:mr-2">
          <button
            id="pen-black-button"
            @click="penBlack"
            class="h-8 w-8 bg-black mr-2"
          >
          </button>
          <button
            id="pen-red-button"
            @click="penRed"
            class="h-8 w-8 bg-red-700 mr-2"
          >
          </button>
          <button
            id="pen-blue-button"
            @click="penBlue"
            class="h-8 w-8 bg-blue-700 mr-2"
          >
          </button>
          <button
            id="pen-yellow-button"
            @click="penYellow"
            class="h-8 w-8 bg-yellow-600 mr-2"
          >
          </button>
          <button
            id="pen-green-button"
            @click="penGreen"
            class="h-8 w-8 bg-green-800 mr-2"
          >
          </button>
          <button
            id="eraser-button"
            @click="eraser"
            class="p-1 bg-white mr-2 text-sm"
          >消しゴム
          </button>
          <button
            id="clear-button"
            @click="clear"
            class="p-1 bg-dark-default text-orange-default mr-2 text-sm"
          >全部消す</button>
        </div>
        <div class="flex mb-2">
          <div
            class="mr-2"
          >
            <span
              class="mr-2"
            >ペンの太さ「{{ penWidth }}」</span>
            <button
              @click="penTiny"
              class="h-3 w-3 bg-gray-700 mr-2 rounded-full"
            ></button>
            <button
              @click="penRegular"
              class="h-5 w-5 bg-gray-700 mr-2 rounded-full"
            ></button>
            <button
              @click="penBold"
              class="h-7 w-7 bg-gray-700 mr-2 rounded-full"
            ></button>
          </div>
          <button
            id="download-button"
            @click="download"
            class="p-1 bg-gray-200 mr-2 text-sm"
          >ダウンロード</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawingSpace',
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      canvasMode: 'penBlack',
      canvas: null,
      context: null,
      penWidth: 5,
      isDrag: false,
      isVisible: false,
      drawingSpace: null,
    };
  },
  mounted() {
    this.canvas = document.querySelector('#myCanvas')
    this.drawingSpace = document.getElementById('drawing-space')
    this.drawingSpaceTitle = document.getElementById('drawing-space-title')
    this.drawingSpaceMenu = document.getElementById('drawing-space-menus')
    this.canvas.width = this.drawingSpace.clientWidth
    this.canvas.height = this.drawingSpace.clientHeight - this.drawingSpaceTitle.clientHeight - (this.drawingSpaceMenu.clientHeight * 1.8)
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
    //ペンの太さ
    penTiny() {
      this.penWidth = 1;
      this.context.lineWidth = this.penWidth;
    },
    penRegular() {
      this.penWidth = 5;
      this.context.lineWidth = this.penWidth;
    },
    penBold() {
      this.penWidth = 10;
      this.context.lineWidth = this.penWidth;
    },
    // ペンモード(黒)
    penBlack() {
      this.canvasMode = 'penBlack';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(50, 50, 50, .1)';
    },
    // ペンモード(赤)
    penRed() {
      this.canvasMode = 'penRed';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(205, 92, 92, .1)';
    },
    // ペンモード(青)
    penBlue() {
      this.canvasMode = 'penBlue';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(70, 130, 180, .1)';
    },
    // ペンモード(黄)
    penYellow() {
      this.canvasMode = 'penYellow';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(255, 215, 0, .1)';
    },
    // ペンモード(緑)
    penGreen() {
      this.canvasMode = 'penGreen';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(46, 139, 87, .1)';
    },
    eraser() {
      this.canvasMode = 'eraser';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = this.penWidth;
      this.context.strokeStyle = 'rgba(255, 255, 255, .1)';
    },
    download() {
      let link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/png");
      link.download = 'Eogiri-' + new Date().getTime() + '.png';
      link.click();
    },
    // 描画(PC)
    draw(e) {
      var x = e.layerX
      var y = e.layerY - this.drawingSpaceTitle.clientHeight
      if(!this.isDrag) {
        return;
      }
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画(スマホ)
    touchMove(e) {
      e.preventDefault();
      var x = e.changedTouches[0].pageX
      var y = e.changedTouches[0].pageY - this.drawingSpaceTitle.clientHeight
      if(!this.isDrag) {
        return;
      }
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画開始(PC)
    dragStart(e) {
      var x = e.layerX
      var y = e.layerY - this.drawingSpaceTitle.clientHeight
      this.context.beginPath();
      this.context.lineTo(x, y);
      this.context.stroke();
      this.isDrag = true;
    },
    // 描画開始(スマホ)
    touchStart(e) {
      e.preventDefault();
      var x = e.changedTouches[0].pageX
      var y = e.changedTouches[0].pageY - this.drawingSpaceTitle.clientHeight
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