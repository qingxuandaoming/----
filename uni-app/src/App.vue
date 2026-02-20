<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import './uni.scss';

/* ==========================================
   Global responsive page margins
   - 5vw padding scales with viewport width
   - max-width caps content width on desktop
   - All pages inherit automatically
   ========================================== */
uni-page-body {
  display: block !important;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 5vw;
  box-sizing: border-box;
}

/* Web/official pages use their own full-width layout */
uni-page-body:has(.official-web-container),
uni-page-body:has(.about-container),
uni-page-body:has(.download-container) {
  max-width: none;
  padding: 0;
}
</style>
