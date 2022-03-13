<template>
  <div>
    <h1>お絵かきスペース</h1>
    <div class="absolute">
      <canvas
        id="myCanvas"
        :class="{ eraser: canvasMode === 'eraser' }"
        class="bg-white border-6 border-orange"
        @mousedown="dragStart"
        @mouseup="dragEnd"
        @mouseout="dragEnd"
        @mousemove="draw"
      >このブラウザは HTML5 Canvas に対応していません。</canvas>
      <div>
        <div class="flex justify-between">
          <button id="pen-black-button" @click="penBlack">ペン(黒)</button>
          <button id="pen-red-button" @click="penRed">ペン(赤)</button>
          <button id="pen-blue-button" @click="penBlue">ペン(青)</button>
          <button id="eraser-button" @click="eraser">消しゴム</button>
          <button id="clear-button" @click="clear">クリア</button>
        </div>
        <button id="download-button" @click="download">ダウンロード</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawingSpace',
  data() {
    return {
      canvasMode: 'penBlack',
      canvas: null,
      context: null,
      isDrag: false,
    };
  },
  mounted() {
    this.canvas = document.querySelector('#myCanvas')
    this.canvas.width = 1280;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d')
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 10;
    this.context.strokeStyle = 'rgba(100, 100, 100, .3)';
  },
  methods: {
    // ペンモード(黒)
    penBlack() {
      this.canvasMode = 'penBlack';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = 10;
      this.context.strokeStyle = 'rgba(10, 10, 10, .1)';
    },
    // ペンモード(赤)
    penRed() {
      this.canvasMode = 'penRed';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = 10;
      this.context.strokeStyle = 'rgba(200, 0, 0, .1)';
    },
    // ペンモード(青)
    penBlue() {
      this.canvasMode = 'penBlue';
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.lineWidth = 10;
      this.context.strokeStyle = 'rgba(0, 0, 100, .1)';
    },
    eraser() {
      this.canvasMode = 'eraser';
      this.context.lineCap = 'square';
      this.context.lineJoin = 'square';
      this.context.lineWidth = 10;
      this.context.strokeStyle = '#fff';
    },
    download() {
      let link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/png");
      link.download = 'canvas-' + new Date().getTime() + '.png';
      link.click();
    },
    // 描画
    draw(e) {
      var x = e.layerX
      var y = e.layerY
      if(!this.isDrag) {
        return;
      }
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画開始(mousedown)
    dragStart(e) {
      var x = e.layerX
      var y = e.layerY
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