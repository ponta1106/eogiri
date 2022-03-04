<template>
  <footer>
    <ul>
      <li>
        <router-link :to="{name: 'TermsOfUse'}">
          <small>利用規約</small>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'PrivacyPolicy'}">
          <small>プライバシーポリシー</small>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'Contact'}">
          <small>お問合せ</small>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'SharedFooter'
}
</script>
